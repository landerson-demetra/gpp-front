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
                            <input type="text" class="form-control" placeholder="R.XXXX.99.99">
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
                        <button class="btn btn btn-success" data-toggle="modal" data-target="#modalContato"><i class="fas fa-plus"></i> Adicionar</button>
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

        }
    }
}


</script>