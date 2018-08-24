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
                                <option value="1">5121</option>
                                <option value="2">5326</option>
                                <option value="3">5878</option>
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
                            <button href="#" class="btn btn-block btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-plus"></i> Novo</button>
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
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Fornecedor</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="">
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label for="">Nome <span class="text-danger">*</span></label>
                                     <input type="text" class="form-control" placeholder="Nome do fornecedor..." required="">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="">Número SAP <span class="text-danger">*</span></label>
                                     <input type="text" placeholder="Número SAP..." class="form-control" required="">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="">CNPJ/CPF <span class="text-danger">*</span></label>
                                    <input type="text" placeholder="CNPJ/CPF do fornecedor..." class="form-control" required="">
                                </div>
                                 <div class="form-group col-md-5">
                                    <label for="Segmento">Segmento(s) <span class="text-danger">*</span></label>
                                    <v-select multiple v-model="segmento" :options="segmentos"></v-select>
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
                                    <v-select name="Nome" id="Nome" placeholder="Selecione um responsável..." :options="[]">
                                        <span slot="no-options">Nenhum responsável encontrado.</span>
                                    </v-select>
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
                    <div class="modal-body ">
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
export default {
    name: 'Fornecedores',
    data() {
        return  {
            fornecedor_selected: false,
            fornecedores: [
                {label: 'Fornecedor 1', value: 1},
                {label: 'Fornecedor 2', value: 2},
                {label: 'Fornecedor 3', value: 3},
                {label: 'Fornecedor 4', value: 4},
                {label: 'Fornecedor 5', value: 5}
            ],

            // Form

            CEPHasError: false,

            CEP: '',
            Logradouro: '',
            Numero: '',
            Bairro: '',
            Estado: '',
            Cidade: '',

            segmento: null,
            segmentos: ['Prefeitura', 'Administradora', 'Fornecedor'],
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

                return
            }

            this.CEPHasError = false

            this.Logradouro = r.tipo_logradouro + ' ' + r.logradouro
            this.Bairro = r.bairro
            this.Estado = r.uf
            this.Cidade = r.cidade
        }
    }

}
</script>