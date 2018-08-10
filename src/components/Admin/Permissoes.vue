<template>
    <div id="permissoes" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Gerenciar permissões</h3>
            </div>
            <div class="card-body">
                <div id="accordion">
                    <div class="card">
                        <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Administradores</button>
                            </h5>
                        </div>

                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                <table class="table table-responsive-sm table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Ler</th>
                                            <th scope="col">Criar</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col"><b>Usuários</b></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Excels</b></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Patrimonios</b></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingTwo">
                            <h5 class="mb-0">
                                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Gestores</button>
                            </h5>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div class="card-body">
<table class="table table-responsive-sm table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Ler</th>
                                            <th scope="col">Criar</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col"><b>Usuários</b></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Excels</b></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Patrimonios</b></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header" id="headingThree">
                            <h5 class="mb-0">
                                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Usuários</button>
                            </h5>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                            <div class="card-body">
<table class="table table-responsive-sm table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Ler</th>
                                            <th scope="col">Criar</th>
                                            <th scope="col">Editar</th>
                                            <th scope="col">Deletar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col"><b>Usuários</b></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Excels</b></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                        <tr>
                                            <td scope="col"><b>Patrimonios</b></td>
                                            <td><switches v-model="enabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                            <td><switches v-model="disabled" theme="bootstrap" color="primary"></switches></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right mt-5">
                    <div class="btn btn-secondary">Resetar</div>
                    <div class="btn btn-primary"><i class="fas fa-check"></i> Salvar</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Switches from 'vue-switches'

export default {
    name: 'Permissoes',
    components: { Switches },
    data() {
        return {
            enabled: true,
            disabled: false,
            text: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.'
        }
    }
}
</script>