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
                            <p>Você tem certeza que deseja deletar esse condomínio?</p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row">
                                    <div class="form-group col-lg-3">
                                        <label for="doc_sap">NºDocumento SAP</label>
                                        <input v-model="DocSAP" type="text" id="doc_sap" placeholder="Número do documento no SAP..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="periodo">Periodo (MM/YY) <span class="text-danger">*</span></label>
                                        <input v-model="Periodo" v-mask="['##/##']" type="text" id="periodo" placeholder="Periodo da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="vencimento">Vencimento <span class="text-danger">*</span></label>
                                        <input v-model="Vencimento" v-mask="['##/##/####']" type="text" id="vencimento" placeholder="Vencimento da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="valor">Valor <span class="text-danger">*</span></label>
                                        <money v-model="Valor" type="text" id="valor" placeholder="Valor da parcela..." class="form-control"></money>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="valor_pago">Valor Pago</label>
                                        <money v-model="ValorPago" type="text" id="valor_pago" placeholder="Valor pago da parcela..." class="form-control"></money>
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="multa">Multa (%) <span class="text-danger">*</span></label>
                                        <input v-model="Multa" v-mask="['#%','##%','###%']" type="text" id="multa" placeholder="Multa da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="juros">Juros (%) <span class="text-danger">*</span></label>
                                        <input v-model="Juros" v-mask="['#%','##%','###%']" type="text" id="juros" placeholder="Juros da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="correcao">Correção (%) <span class="text-danger">*</span></label>
                                        <input v-model="Correcao" v-mask="['#%','##%','###%']" type="text" id="correcao" placeholder="Correção da parcela..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="fonte">Fonte de dados <span class="text-danger">*</span></label>
                                        <v-select v-model="Fonte" id="fonte" placeholder="Selecione uma fonte..." :options="Fontes"></v-select>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="data_pagamento">Data de pagamento</label>
                                        <input id v-model="DataPGTO" v-mask="['##/##/####']" type="text" id="data_pagamento" placeholder="Data de pagamento..." class="form-control">
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
    name: 'CUDCondominios',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return  {
            // Form condominios
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
            //
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
            this.DocSAP = this.datas.doc_sap
            this.Periodo = this.datas.periodo
            this.Vencimento = this.datas.vencimento
            this.Valor = this.datas.valor
            this.ValorPago = (this.datas.valor_pago ? this.datas.valor_pago : 0)
            this.Multa = this.datas.multa
            this.Juros = this.datas.juros
            this.Correcao = this.datas.correcao
            this.Fonte = _.find(this.Fontes, f => f.value == this.datas.fonte)
            this.DataPGTO = this.datas.data_pagamento
        },
        reset(){
            this.DocSAP = ''
            this.Periodo = ''
            this.Vencimento = ''
            this.Valor = ''
            this.ValorPago = ''
            this.Multa = ''
            this.Juros = ''
            this.Correcao = ''
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
                doc_sap: this.DocSAP,
                periodo: this.Periodo,
                vencimento: this.Vencimento,
                valor: this.Valor,
                valor_pago: this.ValorPago,
                multa: parseInt(this.Multa),
                juros: parseInt(this.Juros),
                correcao: parseInt(this.Correcao),
                fonte: this.Fonte.value,
                data_pagamento: this.DataPGTO
            }
        }
    }
}
</script>