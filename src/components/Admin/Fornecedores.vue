<template>
    <div id="fornecedores" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Fornecedores</h3>
            </div>
            <div class="card-body">
                <form action="" method="POST" v-on:submit.prevent>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="SAP">Número SAP</label>
                            <select name="SAP" id="SAP" class="form-control">
                                <option value="5121">5121</option>
                                <option value="5326">5326</option>
                                <option value="5878">5878</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Nome">Nome</label>
                            <v-select name="Nome" id="Nome" placeholder="Selecione..." v-model="fornecedor_selected" :options="this.fornecedores">
                                <span slot="no-options">Nenhum fornecedor encontrado.</span>
                            </v-select>
                        </div>
                        <div class="form-group col-md-2 mt-1">
                            <label for=""></label>
                            <button href="#" class="btn btn-block btn-primary" data-toggle="modal" data-target="#modalNovoFornecedor"><i class="fas fa-plus"></i> Novo</button>
                        </div>
                    </div>
                </form>

                <hr>

                <div v-if="!fornecedor_selected" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Nenhum fornecedor selecionado</div>

                <div class="row" v-if="fornecedor_selected">
                    <div class="form-group col-lg-6"><b>CPF/CNPJ:</b> 09.476.577/0001-49</div>
                    <div class="form-group col-lg-6"><b>Segmento:</b></div>
                    <div class="form-group col-lg-6"><b>Endereço:</b></div>
                    <div class="form-group col-lg-6"><b>CEP:</b></div>
                    <div class="form-group col-lg-6"><b>Município:</b></div>
                    <div class="form-group col-lg-6"><b>Estado:</b></div>
                    <div class="form-group col-lg-6"><b>Site:</b></div>
                    <div class="form-group col-lg-6"><b>Responsável:</b></div>
                </div>

                <div class="row mb-4">
                    <div class="col text-right">
                        <button class="btn btn btn-warning mr-1"><i class="fas fa-edit"></i> Editar</button>
                        <button class="btn btn btn-danger"><i class="fas fa-trash"></i> Excluir</button>
                    </div>
                </div>

                <hr>

                <div v-if="fornecedor_selected">
                    <h5 class="my-4">Dados de contato</h5>
                    <div class="row mt-3 no-gutters">
                        <table class="table table-hover table-responsive-sm table-bordered table-striped border-top-0">
                            <thead>
                                <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Departamento</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Nome</th>
                                    <td>Departamento</td>
                                    <td>Email</td>
                                    <td>Telefone</td>
                                    <td>Celular</td>
                                    <td><div class="action-buttons"><button class="btn btn-warning"><i class="fa fa-edit"></i></button><button class="btn btn-danger"><i class="fa fa-trash"></i></button></div></td>
                                </tr>
                                <tr>
                                    <th>Nome</th>
                                    <td>Departamento</td>
                                    <td>Email</td>
                                    <td>Telefone</td>
                                    <td>Celular</td>
                                    <td><div class="action-buttons"><button class="btn btn-warning"><i class="fa fa-edit"></i></button><button class="btn btn-danger"><i class="fa fa-trash"></i></button></div></td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="col text-right">
                            <button class="btn btn btn-success" data-toggle="modal" data-target="#modalContato"><i class="fas fa-plus"></i> Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Novo Fornecedor -->
        <div class="modal fade" id="modalNovoFornecedor" tabindex="-1" role="dialog" aria-labelledby="modalNovoFornecedorLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalNovoFornecedorLabel">Fornecedor</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" v-on:submit.prevent="saveFornecedor()">
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label for="name">Nome <span class="text-danger">*</span></label>
                                     <input v-model="Nome" id="name" type="text" class="form-control" placeholder="Nome do fornecedor..." required="">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="numero_sap">Número SAP <span class="text-danger">*</span></label>
                                     <input v-model="NumeroSAP" type="text" id="numero_sap" placeholder="Número SAP..." class="form-control" required="">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="cpf_cnpj">CNPJ/CPF <span class="text-danger">*</span></label>
                                    <input v-model="cpf_cnpj" id="cpf_cnpj" type="text" placeholder="CNPJ/CPF do fornecedor..." class="form-control" required="">
                                </div>
                                 <div class="form-group col-md-5">
                                    <label for="Segmento">Segmento(s) <span class="text-danger">*</span></label>
                                    <v-select :placeholder="'Selecione um ou mais segmento(s)...'" multiple v-model="Segmentos" :options="['Prefeitura', 'Administradora', 'Fornecedor']"></v-select>
                                </div>

                                <div class="col-12"><h5>Endereço</h5><hr></div>

                                <div class="form-group col-md-4">
                                   <label for="CEP">CEP</label>
                                   <input :class="{'is-invalid': CEPHasError}" v-model="CEP" type="text" placeholder="CEP..." class="form-control">
                                </div>
                                <div class="form-group col-md-4">
                                   <label for="Logradouro">Logradouro</label>
                                   <input v-model="Logradouro" type="text" placeholder="Logradouro..." class="form-control">
                                </div>
                                <div class="form-group col-md-4">
                                   <label for="Numero">Número</label>
                                   <input v-model="Numero" type="text" placeholder="Número..." class="form-control">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Estado">Bairro</label>
                                    <input v-model="Bairro" type="text" placeholder="Bairro..." class="form-control">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Estado">Estado</label>
                                    <input v-model="Estado" type="text" placeholder="Estado..." class="form-control">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Cidade">Cidade</label>
                                    <input v-model="Cidade" type="text" placeholder="Cidade..." class="form-control">
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="Responsavel">Responsável</label>
                                    <v-select name="Nome" id="Nome" v-model="Responsavel" placeholder="Selecione um responsável..." :options="[]">
                                        <span slot="no-options">Nenhum responsável encontrado.</span>
                                    </v-select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button v-on:click="saveFornecedor()" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Novo Contato -->
        <div class="modal fade" id="modalContato" tabindex="-1" role="dialog" aria-labelledby="modalContatoLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalContatoLabel">Dados de contato</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="">
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label for="Nome">Nome <span class="text-danger">*</span></label>
                                    <input id="Nome" type="text" placeholder="Nome..." class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Departamento">Departamento</label>
                                    <input id="Departamento" type="text" placeholder="Departamento..." class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Email">Email</label>
                                    <input id="Email" type="text" placeholder="Email..." class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Telefone">Telefone</label>
                                    <input id="Telefone" type="text" placeholder="Telefone..." class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Celular">Celular</label>
                                    <input id="Celular" type="text" placeholder="Celular..." class="form-control" required="">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get, store, update } from '../../api/fornecedor'

export default {
    name: 'Fornecedores',
    data() {
        return  {
            fornecedor_selected: false,
            fornecedores: [],

            // Form
            Nome: '',
            NumeroSAP: '',
            cpf_cnpj: '',
            Segmentos: [],

            CEPHasError: false,

            CEP: '',
            Logradouro: '',
            Numero: '',
            Bairro: '',
            Estado: '',
            Cidade: '',

            Responsavel: '',

            segmento: null
        }
    },
    watch: {
        CEP(cep){
            if(cep.length == 8)
                this.$http.get(_.replace(this.$config.cep_url, '{cep}', cep)).then(r => this.assignCepValues(r.data))
        },
    },
    methods: {
        assignCepValues(r){
            if(r.resultado == 0){
                this.CEPHasError = true

                this.Logradouro = ''
                this.Bairro = ''
                this.Estado = ''
                this.Cidade = ''
                this.Responsavel = ''

                return
            }

            this.CEPHasError = false

            this.Logradouro = r.tipo_logradouro + ' ' + r.logradouro
            this.Bairro = r.bairro
            this.Estado = r.uf
            this.Cidade = r.cidade
        },
        saveFornecedor(){
            store(this.getFields).then(r => {
                this.fornecedores.push({ label: r.results.nome, value: r.results.id })
                this.fornecedor_selected = r.results.nome

                this.$notify({group: 'normal', type: 'success', text: 'Fornecedor cadastrado com sucesso' })

                /* # Closing the modal # */
                $('#modalNovoFornecedor').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return
                this.$notify({group: 'normal', type: 'error', title: 'Ops :/', text: 'Ocorreu um erro inesperado'})
            })
        },
        updateFornecedor(){
            /*----------  TODO  ----------*/
            update(this.getFields).then().catch()
        }
    },
    computed: {
        getFields() {
            return {
                'nome': this.Nome,
                'numero_sap': this.NumeroSAP,
                'segmentos': this.Segmentos,
                'cnpj_cpf': this.cpf_cnpj,
                'end_cep': this.CEP,
                'end_logradouro': this.Logradouro,
                'end_numero': this.Numero,
                'end_bairro': this.Bairro,
                'end_estado': this.Estado,
                'end_cidade': this.Cidade,
            }
        }
    },
    mounted() {
        /* Obtendo a lista de fornecedores */
        get().then(r => {
            _.forEach(r.results, (v,k) => {
                this.fornecedores.push({ label: v.nome, value: v.id })
            })
        })
    }
}
</script>