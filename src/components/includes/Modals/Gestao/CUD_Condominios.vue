<template>
    <div>
        <div class="modal fade" :id="'modal' + name" tabindex="-1" role="dialog">
            <div class="modal-dialog shadow" :class="{'modal-lg': action !== 'Delete'}" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'modal' + this.name + 'Label'">{{ this.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="action == 'Delete'">
                            <p>Você tem certeza que deseja deletar esse condomínio?</p>
                        </div>
                        <div v-else>
                            <form v-on:submit.prevent="onSubmit">
                                <input type="submit" hidden>

                                <div class="row">
                                    <div class="form-group col-lg-4">
                                        <label for="status">Status <span class="text-danger">*</span></label>
                                        <v-select v-model="Status" id="status" placeholder="Selecione um status..." :options="Statuses"></v-select>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="doc_sap">NºDocumento SAP</label>
                                        <input v-model="DocSAP"
                                               v-validate="'min:9|numeric'"
                                               data-vv-as="NºDocumento SAP"
                                               name="doc_sap"
                                               :class="{'is-invalid': errors.has('doc_sap')}"
                                        type="text" id="doc_sap" placeholder="Número do documento no SAP..." class="form-control">
                                        <div class="invalid-feedback">{{ errors.first('doc_sap') }}</div>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="periodo">Periodo (MM/YY) <span class="text-danger">*</span></label>
                                        <input v-model="Periodo"
                                               v-mask="['##/##']"
                                               v-validate="'required|date_format:MM/YY'"
                                               data-vv-as="Periodo"
                                               name="periodo"
                                               :class="{'is-invalid': errors.has('periodo')}"
                                            type="text" id="periodo" placeholder="__/__" class="form-control">
                                        <div class="invalid-feedback">{{ errors.first('periodo') }}</div>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="vencimento">Vencimento <span class="text-danger">*</span></label>
                                        <input v-model="Vencimento"
                                               v-mask="['##/##/####']"
                                               v-validate="'required|date_format:DD/MM/YYYY'"
                                               data-vv-as="Vencimento"
                                               name="vencimento"
                                               :class="{'is-invalid': errors.has('vencimento')}"
                                        type="text" id="vencimento" placeholder="__/__/____" class="form-control">
                                        <div class="invalid-feedback">{{ errors.first('vencimento') }}</div>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="valor">Valor <span class="text-danger">*</span></label>
                                        <money v-model="Valor"
                                               v-validate="'required|min_value:1'"
                                               data-vv-as="Valor"
                                               name="valor"
                                               :class="{'is-invalid': errors.has('valor')}"
                                            type="text" id="valor" placeholder="Valor da parcela..." class="form-control"></money>
                                            <div class="invalid-feedback">{{ errors.first('valor') }}</div>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="valor_pago">Valor Pago</label>
                                        <money
                                            v-model="ValorPago"
                                            v-validate="{min_value: Status !== 'Pago' ? null : 1}"
                                            data-vv-as="Valor Pago"
                                            name="valor_pago"
                                            :class="{'is-invalid': errors.has('valor_pago')}"
                                            :disabled="Status !== 'Pago'"
                                        type="text" id="valor_pago" placeholder="Valor pago da parcela..." class="form-control"></money>
                                        <div class="invalid-feedback">{{ errors.first('valor') }}</div>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="multa">Multa (%) <span class="text-danger">*</span></label>
                                        <input v-model="Multa" v-mask="['#%','##%','###%']" type="text" id="multa" placeholder="Multa da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="juros">Juros (%) <span class="text-danger">*</span></label>
                                        <input v-model="Juros" v-mask="['#%','##%','###%']" type="text" id="juros" placeholder="Juros da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="correcao">Correção (%) <span class="text-danger">*</span></label>
                                        <input v-model="Correcao" v-mask="['#%','##%','###%']" type="text" id="correcao" placeholder="Correção da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="fonte">Fonte de dados <span class="text-danger">*</span></label>
                                        <select class="form-control" v-model="Fonte">
                                            <option value="">Selecione...</option>
                                            <option v-for="vFonte in Fontes" :value="vFonte">{{ vFonte }}</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="data_pagamento">Data de pagamento</label>
                                        <input v-model="DataPGTO"
                                               v-mask="['##/##/####']"
                                               v-validate="Status == 'Pago' ? 'required|date_format:DD/MM/YYYY' : null"
                                               data-vv-as="Data de pagamento"
                                               name="data_pagamento"
                                               :class="{'is-invalid': errors.has('data_pagamento')}"
                                               :disabled="Status !== 'Pago'"
                                        type="text" id="data_pagamento" placeholder="Data de pagamento..." class="form-control">
                                        <div class="invalid-feedback">{{ errors.first('data_pagamento') }}</div>
                                    </div>
                                </div>

                                <hr>

                                <p class="text-muted"><strong>%IPCA acumulado:</strong> {{ this.per_ipca ? this.per_ipca : 0 }}</p>
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
    name: 'CUDCondominios',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return  {
            // Form condominios
            Status: 'Aberto',
            DocSAP: '',
            Periodo: '',
            Vencimento: '',
            Valor: '',
            ValorPago: '',
            Multa: 2,
            Juros: 1,
            Correcao: 0,
            Fonte: '',
            DataPGTO: '',
            per_ipca: '',
            //
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
            if(this.action == 'New') this.reset()
        },
        fill(){
            this.Status = this.datas.status
            this.DocSAP = this.datas.doc_sap
            this.Periodo = this.datas.periodo
            this.Vencimento = this.datas.vencimento
            this.Valor = this.datas.valor
            this.ValorPago = (this.datas.valor_pago ? this.datas.valor_pago : 0)
            this.Multa = this.datas.multa
            this.Juros = this.datas.juros
            this.Correcao = this.datas.correcao
            this.Fonte = this.datas.fonte
            this.DataPGTO = this.datas.data_pagamento
            this.per_ipca = this.datas.per_ipca
        },
        reset(){
            this.Status = 'Aberto'
            this.DocSAP = ''
            this.Periodo = ''
            this.Vencimento = ''
            this.Valor = ''
            this.ValorPago = ''
            this.Multa = 2
            this.Juros = 1
            this.Correcao = 0
            this.Fonte = ''
            this.DataPGTO = ''
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
                vencimento: this.Vencimento,
                valor: this.Valor,
                valor_pago: this.ValorPago,
                multa: parseInt(this.Multa),
                juros: parseInt(this.Juros),
                correcao: parseInt(this.Correcao),
                fonte: this.Fonte ? this.Fonte : null,
                data_pagamento: this.DataPGTO
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