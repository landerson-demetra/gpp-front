<template>
    <div>
        <div class="modal fade" id="modalResponsaveis" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalResponsaveisLabel">Responsáveis <small class="opacity-small">[ {{ this.PEP }} ]</small></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div v-if="!datas" class="modal-body">
                        <div class="alert alert-warning">Não há vinculações</div>
                        <router-link :to="{ name: 'Vinculacao', params: { projeto: getProjeto } }"class="btn btn-success"><i class="fas fa-sync"></i> Vinculação</router-link>
                    </div>
                    <div v-else class="modal-body">
                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-administradoras-tab" data-toggle="pill" href="#pills-administradoras" role="tab" aria-controls="pills-administradoras" aria-selected="true">Administradora</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-fornecedor-sap-tab" data-toggle="pill" href="#pills-fornecedor-sap" role="tab" aria-controls="pills-fornecedor-sap" aria-selected="false">Fornecedor SAP – Cotas Condominiais</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-fornecedor-agua-tab" data-toggle="pill" href="#pills-fornecedor-agua" role="tab" aria-controls="pills-fornecedor-agua" aria-selected="false">Fornecedor Água</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-fornecedor-luz-tab" data-toggle="pill" href="#pills-fornecedor-luz" role="tab" aria-controls="pills-fornecedor-luz" aria-selected="false">Fornecedor Luz</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-fornecedor-prefeitura-tab" data-toggle="pill" href="#pills-fornecedor-prefeitura" role="tab" aria-controls="pills-fornecedor-prefeitura" aria-selected="false">Prefeitura</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-responsavel-tab" data-toggle="pill" href="#pills-responsavel" role="tab" aria-controls="pills-responsavel" aria-selected="false">Responsável PDG (Empreendimento)</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-administradoras" role="tabpanel" aria-labelledby="pills-administradoras-tab">
                                <div v-if="!datas.administradora" class="alert alert-warning">Nada encontrado.</div>
                                <table v-else class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Número SAP</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Responsável Administradora</th>
                                            <th scope="col">CPF/CNPJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ this.datas.administradora.numero_sap }}</td>
                                            <td>{{ this.datas.administradora.nome }}</td>
                                            <td>{{ this.datas.administradora.responsavel }}</td>
                                            <td>{{ this.datas.administradora.cnpj_cpf }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="pills-fornecedor-sap" role="tabpanel" aria-labelledby="pills-fornecedor-sap-tab">
                                <div v-if="!datas.fornecedorsap" class="alert alert-warning">Nenhum Fornecedor SAP vinculado.</div>
                                <table v-else class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Número SAP</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Responsável F.SAP</th>
                                            <th scope="col">CPF/CNPJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ this.datas.fornecedorsap.numero_sap }}</td>
                                            <td>{{ this.datas.fornecedorsap.nome }}</td>
                                            <td>{{ this.datas.fornecedorsap.responsavel }}</td>
                                            <td>{{ this.datas.fornecedorsap.cnpj_cpf }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="pills-fornecedor-agua" role="tabpanel" aria-labelledby="pills-fornecedor-agua-tab">
                                <div v-if="!datas.fornecedoragua" class="alert alert-warning">Nenhum Fornecedor Água vinculado.</div>
                                <table v-else class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Número SAP</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Responsável F.Água</th>
                                            <th scope="col">CPF/CNPJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ this.datas.fornecedoragua.numero_sap }}</td>
                                            <td>{{ this.datas.fornecedoragua.nome }}</td>
                                            <td>{{ this.datas.fornecedoragua.responsavel }}</td>
                                            <td>{{ this.datas.fornecedoragua.cnpj_cpf }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="pills-fornecedor-luz" role="tabpanel" aria-labelledby="pills-fornecedor-luz-tab">
                                <div v-if="!datas.fornecedorluz" class="alert alert-warning">Nenhum Fornecedor Luz vinculado.</div>
                                <table v-else class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Número SAP</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Responsável F.Luz</th>
                                            <th scope="col">CPF/CNPJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ this.datas.fornecedorluz.numero_sap }}</td>
                                            <td>{{ this.datas.fornecedorluz.nome }}</td>
                                            <td>{{ this.datas.fornecedorluz.responsavel }}</td>
                                            <td>{{ this.datas.fornecedorluz.cnpj_cpf }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="pills-fornecedor-prefeitura" role="tabpanel" aria-labelledby="pills-prefeitur-tab">
                                <div v-if="!datas.prefeitura" class="alert alert-warning">Nenhuma Prefeitura vinculada.</div>
                                <table v-else class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Número SAP</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Responsável Prefeitura</th>
                                            <th scope="col">CPF/CNPJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ this.datas.prefeitura.numero_sap }}</td>
                                            <td>{{ this.datas.prefeitura.nome }}</td>
                                            <td>{{ this.datas.prefeitura.responsavel }}</td>
                                            <td>{{ this.datas.prefeitura.cnpj_cpf }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="pills-responsavel" role="tabpanel" aria-labelledby="pills-responsavel-tab">
                                <div v-if="!datas.responsavel" class="alert alert-warning">Nenhum reponsável vinculado.</div>
                                <table v-else class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{{ this.datas.responsavel }}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
import { parsePEP, reMountPEP } from '../../../../modules/pep'
import { get } from '../../../../api/vinculacoes'

export default {
    name: 'Responsaveis',
    props: ['Projeto', 'PEP'],
    data() {
        return {
            datas: null
        }
    },
    computed: {
        getProjeto() {
            if(this.PEP)
                return this.PEP.substring(0, 12)
        }
    },
    watch: {
        Projeto() {
            this.fetch()
        }
    },
    methods: {
        fetch() {
            // Vinculações
            get(this.Projeto.id).then(r => this.datas = r.results)
        }
    }
}
</script>