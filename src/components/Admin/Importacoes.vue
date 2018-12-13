<template>
    <div>
        <div class="row">
            <div class="mb-5 col-md-12 col-lg-12">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-primary text-white">
                        <div class="row">
                            <h3 class="col-md-7 mt-0">Importações</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
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
                                            <li><b>Unidades:</b> {{ datas.unidades.toFixed() }}</li>
                                            <li><b>Blocos:</b> {{ datas.blocos | currency }}</li>
                                            <li><b>Emprendimentos:</b> {{ datas.empreendimentos | currency }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <table class="table table-striped">
<!--                             <tbody>
                                <tr><td><b>Divida ativa</b></td></tr>
                                <tr>
                                    <td>
                                        <ul>
                                            <li>Total: R$ 0,00</li>
                                            <li>Multa: R$ 0,00</li>
                                            <li>Juros: R$ 0,00</li>
                                            <li>Correção: R$ 0,00</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr><td><b>Divida ativa paga</b></td></tr>
                                <tr>
                                    <td>R$ 0,00</td>
                                </tr>
                                <tr><td><b>Divida ativa</b></td></tr>
                                <tr>
                                    <td>0</td>
                                </tr>
                                <tr><td><b>Invadido</b></td></tr>
                                <tr>
                                    <td>0</td>
                                </tr>
                                <tr><td><b>Ações</b></td></tr>
                                <tr>
                                    <td>0</td>
                                </tr>
                                <tr><td><b>Unidades</b></td></tr>
                                <tr>
                                    <td>5409</td>
                                </tr>
                                <tr><td><b>Blocos</b></td></tr>
                                <tr>
                                    <td>2144</td>
                                </tr>
                                <tr><td><b>Empreendimentos</b></td></tr>
                                <tr>
                                    <td>798</td>
                                </tr>
                            </tbody> -->
                        </table>
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { resumo } from '../../api/gestao'

export default {
    data() {
        return {
            datas: []
        }
    },
    mounted() {
        resumo().then(r => this.datas = r.results)
    }
}
</script>