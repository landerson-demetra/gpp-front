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
                            <p>Você tem certeza que deseja deletar essa luz?</p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row">
                                    <div class="form-group col-lg-4">
                                        <label for="status">Status <span class="text-danger">*</span></label>
                                        <v-select v-model="Status" id="status" placeholder="Selecione um status..." :options="Statuses"></v-select>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="doc_sap">NºDocumento SAP</label>
                                        <input v-model="DocSAP" type="text" id="doc_sap" placeholder="Número do documento no SAP..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="periodo">Periodo (MM/YY) <span class="text-danger">*</span></label>
                                        <input v-model="Periodo" v-mask="['##/##']" type="text" id="periodo" placeholder="__/__" class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="vencimento">Vencimento <span class="text-danger">*</span></label>
                                        <input v-model="Vencimento" v-mask="['##/##/####']" type="text" id="vencimento" placeholder="__/__/____" class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="valor">Valor <span class="text-danger">*</span></label>
                                        <money v-model="Valor" type="text" id="valor" placeholder="Valor da parcela..." class="form-control"></money>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="valor_pago">Valor Pago</label>
                                        <money v-model="ValorPago" type="text" id="valor_pago" placeholder="Valor pago da parcela..." class="form-control"></money>
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
                                        <label for="data_pagamento">Data de pagamento</label>
                                        <input v-model="DataPGTO" v-mask="['##/##/####']" type="text" id="data_pagamento" placeholder="__/__/____" class="form-control">
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="fonte">Fonte de dados <span class="text-danger">*</span></label>
                                        <v-select v-model="Fonte" id="fonte" placeholder="Selecione uma fonte..." :options="Fontes"></v-select>
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
    name: 'CUD_Luzes',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return  {
            // Form condominios
            Status: '',
            DocSAP: '',
            Periodo: '',
            Vencimento: '',
            Valor: '',
            ValorPago: '',
            Multa: 0,
            Juros: 0,
            Correcao: 0,
            Fonte: '',
            DataPGTO: '',
            //
            Statuses: [
                {label: 'N/Definido', value: null},
                {label: 'Aberto', value: 'Aberto'},
                {label: 'Renegociado', value: 'Renegociado'},
                {label: 'Pago', value: 'Pago'}
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
            this.Periodo = this.datas.periodo
            this.Vencimento = this.datas.vencimento
            this.Valor = this.datas.valor
            this.ValorPago = (this.datas.valor_pago ? this.datas.valor_pago : 0)
            this.Multa = this.datas.multa
            this.Juros = this.datas.juros
            this.Correcao = this.datas.correcao_monetaria
            this.Fonte = _.find(this.Fontes, f => f.value == this.datas.fonte)
            this.DataPGTO = this.datas.data_pagamento
        },
        reset(){
            this.Status = ''
            this.DocSAP = ''
            this.Periodo = ''
            this.Vencimento = ''
            this.Valor = ''
            this.ValorPago = ''
            this.Multa = 0
            this.Juros = 0
            this.Correcao = 0
            this.Fonte = this.Fontes[0]
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
                status: this.Status.value,
                doc_sap: this.DocSAP,
                periodo: this.Periodo,
                vencimento: this.Vencimento,
                valor: this.Valor,
                valor_pago: this.ValorPago,
                multa: this.Multa,
                juros: this.Juros,
                correcao_monetaria: this.Correcao,
                fonte: this.Fonte.value,
                data_pagamento: this.DataPGTO
            }
        }
    }
}
</script>