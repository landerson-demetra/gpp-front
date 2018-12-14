<template>
    <div>
        <div class="modal fade" id="modalResumo" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalResumoLabel">Resumo <small class="opacity-small">[ {{ this.PEP }} ]</small></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" v-if="this.datas">
                            <div v-for="(count, name) in datas.counts" class="col-md-6 mb-3">
                                <div class="card">
                                    <div class="card-header border-0 bg-primary text-white">
                                        <h5>{{ name }}</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul>
                                            <li>Total: R$ {{ count.total | currency }}</li>
                                            <li>Multa: R$ {{ count.multa | currency }}</li>
                                            <li>Juros: R$ {{ count.juros | currency }}</li>
                                            <li>Correção: R$ {{ count.correcao | currency }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header border-0 bg-primary text-white">
                                        <h5>Pago</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul>
                                            <li>R$ {{ datas.pago | currency }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header border-0 bg-primary text-white">
                                        <h5>Outros</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul>
                                            <li><b>Ações:</b> {{ datas.acoes | currency }}</li>
                                            <li><b>Invadido:</b> {{ datas.invadidos | currency }}</li>
                                            <li><b>Unidades:</b> {{ datas.unidades | currency }}</li>
                                            <li><b>Blocos:</b> {{ datas.blocos | currency }}</li>
                                            <li><b>Emprendimentos:</b> {{ datas.empreendimentos | currency }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { resumo } from '../../../../api/gestao'

export default {
    name: 'GestaoResumo',
    props: ['PEP'],
    datas() {
        return {
            datas: false
        }
    },
    methods: {
        onlyEmpred() {
            console.log(123)
        }
    },
    mounted() {
        //resumo().then(r => this.datas = r.results)
    }
}
</script>