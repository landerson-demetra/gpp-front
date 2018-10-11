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
                            <form>
                                <div class="row">
                                    <div class="form-group col-lg-3">
                                        <label for="status">Status <span class="text-danger">*</span></label>
                                        <v-select v-model="Status" id="status" :options="Statuses"></v-select>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="doc_sap">NºDocumento SAP</label>
                                        <input v-model="DocSAP" type="text" id="doc_sap" placeholder="Número do documento no SAP..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="parcela">Nº da Parcela <span class="text-danger">*</span></label>
                                        <the-mask v-model="Parcela" :mask="['#','##','###']" type="text" id="parcela" placeholder="Nº" class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="periodo">Periodo <span class="text-danger">*</span></label>
                                        <the-mask v-model="Periodo" :mask="['##/####']" :masked="true" type="text" id="periodo" placeholder="__/____" class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="vencimento">Vencimento <span class="text-danger">*</span></label>
                                        <the-mask v-model="Vencimento" :mask="['##/##/####']" :masked="true" type="text" id="vencimento" placeholder="__/__/____" class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="valor">Valor <span class="text-danger">*</span></label>
                                        <money v-model="Valor" type="text" id="valor" placeholder="Valor..." class="form-control"></money>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="multa">Multa (%) <span class="text-danger">*</span></label>
                                        <the-mask v-model="Multa" :mask="['#%','##%','###%']" type="text" id="multa" placeholder="Multa da parcela..." class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="juros">Juros (%) <span class="text-danger">*</span></label>
                                        <the-mask v-model="Juros" :mask="['#%','##%','###%']" type="text" id="juros" placeholder="Juros da parcela..." class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="correcao">Correção (%) <span class="text-danger">*</span></label>
                                        <the-mask v-model="Correcao" :mask="['#%','##%','###%']" type="text" id="correcao" placeholder="Correção monetária da parcela..." class="form-control" />
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="divida_ativa">Dívida Ativa <span class="text-danger">*</span></label>
                                        <v-select v-model="DividaAtiva" id="divida_ativa" :options="Dividas"></v-select>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="fonte">Fonte de dados <span class="text-danger">*</span></label>
                                        <v-select v-model="Fonte" id="fonte" :options="Fontes"></v-select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="this.action !== 'Delete'">
                            <button type="button" class="btn btn-default" v-on:click="this.closeEvent" data-dismiss="modal">Fechar</button>
                            <button v-on:click.prevent="emitOkEvent" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                            <button v-if="this.action == 'Delete'" v-on:click="this.emitOkEvent" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Sim, tenho.</button>
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
            Status: '',
            DocSAP: '',
            Parcela: '',
            Periodo: '',
            Vencimento: '',
            Valor: '',
            Juros: 1,
            Multa: 2,
            Correcao: 0,
            DividaAtiva: {label: 'Não', value: 'N'},
            Fonte: '',
            //
            Dividas: [
                {label: 'Sim', value: 'S'},
                {label: 'Não', value: 'N'}
            ],
            Statuses: [
                {label: 'N/Definido', value: null},
                {label: 'Aberto', value: 'A'},
                {label: 'Renegociado', value: 'R'}
            ],
            Fontes: [
                {label: 'Relatório', value: 'R'},
                {label: 'Projeção', value: 'P'}
            ]
        }
    },
    methods: {
        emitOkEvent(){
            Bus.$emit('ev' + this.name, (this.action !== 'Delete' ? this.getFields : true))

            if(this.action == 'New')
                this.reset()
        },
        closeEvent(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            this.Status = _.find(this.Statuses, f => f.value == this.datas.status)
            this.DocSAP = this.datas.doc_sap
            this.Parcela = this.datas.parcela
            this.Periodo = this.datas.periodo
            this.Vencimento = this.datas.vencimento
            this.Valor = this.datas.valor_principal
            this.Juros = this.datas.juros
            this.Multa = this.datas.multa
            this.Correcao = this.datas.correcao_monetaria
            this.DividaAtiva = _.find(this.Dividas, f => f.value == this.datas.divida_ativa)
            this.Fonte = _.find(this.Fontes, f => f.value == this.datas.fonte)
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
                status: this.Status.value,
                doc_sap: this.DocSAP,
                periodo: this.Periodo,
                parcela: this.Parcela,
                vencimento: this.Vencimento,
                valor_principal: this.Valor,
                multa: this.Multa,
                juros: this.Juros,
                correcao_monetaria: this.Correcao,
                divida_ativa: this.DividaAtiva.value,
                fonte: this.Fonte.value
            }
        }
    },
    beforeDestroy() {
        this.reset()
    }
}
</script>