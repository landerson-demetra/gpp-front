<template>
    <div>
        <div class="modal fade" :id="'modal' + this.name" tabindex="-1" role="dialog">
            <div class="modal-dialog shadow" :class="{'modal-lg': this.action !== 'Delete'}" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'modal' + this.name + 'Label'">{{ this.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="this.action == 'Delete'">
                            <p>Você tem certeza que deseja deletar esse IPTU?</p>
                        </div>
                        <div v-else>
                            <form v-on:submit.prevent="onSubmit">
                                <input type="submit" hidden>

                                <div class="row">
                                    <div class="form-group col-lg-3">
                                        <label for="status">Status</label>
                                        <select class="form-control" v-model="Status">
                                            <option v-for="vStatus in Statuses" :value="vStatus">{{ vStatus }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="doc_sap">NºDocumento SAP</label>
                                        <input v-model="DocSAP" type="text" id="doc_sap" placeholder="Número do documento no SAP..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="parcela">Nº da Parcela <span class="text-danger">*</span></label>
                                        <the-mask v-model="Parcela"
                                                  :mask="['#','##','###']"
                                                  v-validate="'required|numeric'"
                                                  data-vv-as="Nº da Parcela"
                                                  name="parcela"
                                                  :class="{'is-invalid': errors.has('parcela')}"
                                        type="text" id="parcela" placeholder="Nº" class="form-control" />
                                        <div class="invalid-feedback">{{ errors.first('parcela') }}</div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="periodo">Periodo <span class="text-danger">*</span></label>
                                        <the-mask v-model="Periodo"
                                                  :mask="['##/##']"
                                                  :masked="true"
                                                  v-validate="'required|date_format:MM/YY'"
                                                  data-vv-as="Periodo"
                                                  name="periodo"
                                                  :class="{'is-invalid': errors.has('periodo')}"
                                        type="text" id="periodo" placeholder="__/____" class="form-control" />
                                        <div class="invalid-feedback">{{ errors.first('periodo') }}</div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="vencimento">Vencimento <span class="text-danger">*</span></label>
                                        <the-mask v-model="Vencimento"
                                                  :mask="['##/##/####']"
                                                  :masked="true"
                                                  v-validate="'required|date_format:DD/MM/YYYY'"
                                                  data-vv-as="Vencimento"
                                                  name="vencimento"
                                                  :class="{'is-invalid': errors.has('vencimento')}"
                                        type="text" id="vencimento" placeholder="__/__/____" class="form-control" />
                                        <div class="invalid-feedback">{{ errors.first('vencimento') }}</div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="valor">Valor <span class="text-danger">*</span></label>
                                        <money v-model="Valor"
                                               v-validate="'required|min_value:1'"
                                               data-vv-as="Valor"
                                               name="valor"
                                               :class="{'is-invalid': errors.has('valor')}"
                                        type="text" id="valor" placeholder="Valor..." class="form-control"></money>
                                        <div class="invalid-feedback">{{ errors.first('valor') }}</div>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="multa">Multa (%)</label>
                                        <the-mask v-model="Multa" :mask="['#%','##%','###%']" type="text" id="multa" placeholder="Multa da parcela..." class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="juros">Juros (%)</label>
                                        <the-mask v-model="Juros" :mask="['#%','##%','###%']" type="text" id="juros" placeholder="Juros da parcela..." class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="correcao">Correção (%)</label>
                                        <the-mask v-model="Correcao" :mask="['#%','##%','###%']" type="text" id="correcao" placeholder="Correção monetária da parcela..." class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="divida_ativa">Dívida Ativa</label>
                                        <select class="form-control" v-model="DividaAtiva">
                                            <option v-for="vDivida in Dividas" :value="vDivida">{{ vDivida }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="fonte">Fonte de dados</label>
                                        <select class="form-control" v-model="Fonte">
                                            <option v-for="vFonte in Fontes" :value="vFonte">{{ vFonte }}</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="action !== 'Delete'">
                            <button type="button" class="btn btn-default" v-on:click="onClose" data-dismiss="modal">Fechar</button>
                            <button v-on:click.prevent="onSubmit" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                            <button v-if="action == 'Delete'" v-on:click="onSubmit" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Sim, tenho.</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../../../bus'
import {mask} from 'vue-the-mask'

export default {
    name: 'CUD_Iptus',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return {
            Status: 'Aberto',
            DocSAP: '',
            Parcela: '',
            Periodo: '',
            Vencimento: '',
            Valor: '',
            Juros: 1,
            Multa: 2,
            Correcao: 0,
            DividaAtiva: 'Não',
            Fonte: 'Projeção',
            //
            Dividas: ['Sim', 'Não'],
            Statuses: ['Aberto', 'Renegociado', 'Pago'],
            Fontes: ['Relatório', 'Projeção']
        }
    },
    methods: {
        onSubmit(){
            // Não teremos validação na action 'Delete'.
            if(this.action == 'Delete')
                return Bus.$emit('ev' + this.name, true)

            // Verifica por erros de validação.
            this.$validator.validate().then(result => {
                if(result)
                    Bus.$emit('ev' + this.name, this.getFields)
                else
                    this.$notify({ group: 'normal', type: 'warn', text: 'Corrija os campos informados.' })
            })
        },
        onClose(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            this.Status = this.datas.status
            this.DocSAP = this.datas.doc_sap
            this.Parcela = this.datas.parcela
            this.Periodo = this.datas.periodo
            this.Vencimento = this.datas.vencimento
            this.Valor = this.datas.valor_principal
            this.Juros = this.datas.juros
            this.Multa = this.datas.multa
            this.Correcao = this.datas.correcao_monetaria
            this.DividaAtiva =  this.datas.divida_ativa
            this.Fonte = this.datas.fonte
        },
        reset(){
            this.Status = ''
            this.DocSAP = ''
            this.Parcela = ''
            this.Periodo = ''
            this.Vencimento = ''
            this.Valor = ''
            this.Juros = 1
            this.Multa = 2
            this.Correcao = 0
            this.DividaAtiva = {label: 'Não', value: 'N'}
            this.Fonte = ''
        }
    },
    watch: {
        datas(){
            if(this.action == 'Edit')
                this.fill()
        }
    },
    computed: {
        getFields() {
            return {
                status: this.Status,
                doc_sap: this.DocSAP,
                periodo: this.Periodo,
                parcela: this.Parcela,
                vencimento: this.Vencimento,
                valor_principal: this.Valor,
                multa: this.Multa,
                juros: this.Juros,
                correcao_monetaria: this.Correcao,
                divida_ativa: this.DividaAtiva,
                fonte: this.Fonte
            }
        }
    },
    mounted() {
        Bus.$on('resetForms', () => this.reset())
    },
    beforeDestroy() {
        Bus.$off()
    }
}
</script>