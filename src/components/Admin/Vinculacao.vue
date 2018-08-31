<template>
    <div id="vinculacao" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Vinculação PEP</h3>
            </div>
            <div class="card-body">
                <form action="">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="PEP">PEP</label>
                            <input v-model="pep" type="text" class="form-control" placeholder="R.XXXX.99.99">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Empreendimento">Empreendimento</label>
                            <v-select name="Empreendimento" id="Empreendimento" placeholder="Selecione..." :options="[]">
                                <span slot="no-options">Nenhum empreendimento encontrado.</span>
                            </v-select>
                        </div>
                    </div>
                </form>

                <hr>

                <div class="row mt-3 no-gutters">
                    <table class="table table-hover table-responsive-sm table-bordered table-striped border-top-0">
                        <thead>
                            <tr>
                            <th scope="col">PEP</th>
                            <th scope="col">ADM</th>
                            <th scope="col">Fornecedor</th>
                            <th scope="col">Prefeitura</th>
                            <th scope="col">Responsável</th>
                            <th scope="col">Individualizado</th>
                            <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>PEP</th>
                                <td>ADM</td>
                                <td>Fornecedor</td>
                                <td>Prefeitura</td>
                                <td>Responsável</td>
                                <td>Individualizado</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-warning"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>PEP</th>
                                <td>ADM</td>
                                <td>Fornecedor</td>
                                <td>Prefeitura</td>
                                <td>Responsável</td>
                                <td>Individualizado</td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-warning"><i class="fa fa-edit"></i></button>
                                        <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="col text-right">
                        <button class="btn btn btn-success" data-toggle="modal" data-target="#addVinc"><i class="fas fa-plus"></i> Adicionar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addVinc" tabindex="-1" role="dialog" aria-labelledby="addVincLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addVincLabel">Administração</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="PEP">PEP</label>
                                    <input :value="pep" disabled="" id="PEP" type="text" class="form-control">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Individualizado">Individualizado</label>
                                    <select class="form-control">
                                        <option value="">Selecione</option>
                                        <option value="1">Sim</option>
                                        <option value="0">Não</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">



                                <div class="form-group col-md-4">
                                    <label for="ADM">ADM</label>
                                    <v-select id="ADM" placeholder="Selecione..." :options="this.administradoras">
                                        <span slot="no-options">Nenhuma administradora encontrada.</span>
                                    </v-select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Fornecedor">Fornecedor</label>
                                    <v-select id="ADM" placeholder="Selecione..." :options="this.fornecedores">
                                        <span slot="no-options">Nenhum fornecedor encontrado.</span>
                                    </v-select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="Prefeitura">Prefeitura</label>
                                    <v-select id="ADM" placeholder="Selecione..." :options="this.prefeituras">
                                        <span slot="no-options">Nenhuma prefeitura encontrada</span>
                                    </v-select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Vinculacao',
    data() {
        return {
            show: true,
            pep: '',
        }
    }
}


</script>