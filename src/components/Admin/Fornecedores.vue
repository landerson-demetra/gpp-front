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
                            <v-select name="Nome" id="Nome" placeholder="Selecione..." :options="this.fornecedores">
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

                <div v-if="false" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Nenhum fornecedor selecionado</div>

                <div class="row" v-if="true">
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
                                     <input type="text" class="form-control" required="">
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="">Número SAP <span class="text-danger">*</span></label>
                                     <input type="text" class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">CNPJ/CPF <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" required="">
                                </div>
                                 <div class="form-group col-md-3">
                                    <label for="Segmento">Segmento <span class="text-danger">*</span></label>
                                    <select name="" id="Segmento" class="form-control">
                                        <option>Selecione</option>
                                        <option value="Prefeitura">Prefeitura</option>
                                        <option value="Administradora">Administradora</option>
                                        <option value="Fornecedor">Fornecedor</option>
                                    </select>
                                </div>

                                <div class="col-12"><h5>Endereço</h5><hr></div>

                                <div class="form-group col-md-3">
                                   <label for="CEP">CEP</label>
                                   <input type="text" class="form-control">
                                </div>
                                <div class="form-group col-md-6">
                                   <label for="Logradouro">Logradouro</label>
                                   <input type="text" class="form-control">
                                </div>
                                <div class="form-group col-md-3">
                                   <label for="Numero">Numero</label>
                                   <input type="text" class="form-control">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Estado">Estado</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group col-md-8">
                                    <label for="Cidade">Cidade</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Cidade">Cidade</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Responsavel">Responsável</label>
                                    <input type="text" class="form-control">
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
                                    <input id="Nome" type="text" class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Departamento">Departamento</label>
                                    <input id="Departamento" type="text" class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Email">Email</label>
                                    <input id="Email" type="text" class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Telefone">Telefone</label>
                                    <input id="Telefone" type="text" class="form-control" required="">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="Celular">Celular</label>
                                    <input id="Celular" type="text" class="form-control" required="">
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
            fornecedores: [
                'Fornecedor 1',
                'Fornecedor 2',
                'Fornecedor 3',
                'Fornecedor 4',
                'Fornecedor 5'
            ]
        }
    },
    computed: {},

}
</script>