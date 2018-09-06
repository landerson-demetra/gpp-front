<template>
    <div id="DadosUnidade" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Dados da Unidade</h3>
            </div>
            <div class="card-body">
                <form action="">
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="PEP">PEP</label>
                            <input v-model="PEP" id="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99.99.9999">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="Empreendimento">Empreendimento</label>
                            <v-select v-model="Empreendimento" name="Empreendimento" placeholder="Empreendimento" :options="[]">
                                <span slot="no-options">Nenhum empreendimento encontrado.</span>
                            </v-select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Bloco">Bloco</label>
                            <v-select v-model="Bloco" name="Bloco" placeholder="Bloco" :options="[]">
                                <span slot="no-options">Nenhum bloco encontrado.</span>
                            </v-select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="Unidade">Unidade</label>
                            <v-select v-model="Unidade" name="Unidade" placeholder="Unidade" :options="[]">
                                <span slot="no-options">Nenhuma unidade encontrada.</span>
                            </v-select>
                        </div>
                    </div>
                </form>

                <hr>

                <div v-if="!dados_unidade" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Nenhuma unidade selecionada</div>

                <div v-else>
                    <table class="table table-hover table-responsive-sm table-bordered table-striped border-top-0">
                        <thead>
                            <tr>
                                <th scope="col">PEP</th>
                                <th scope="col">Nº do Contribuinte</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Senha</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dado in dados_unidade">
                                <td>{{ dado.PEP_Unidade }}</td>
                                <td>{{ dado.N_Contribuinte }}</td>
                                <td>{{ dado.usuario }}</td>
                                <td>{{ dado.senha }}</td>
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
                        <button class="btn btn-success" data-toggle="modal" data-target="#modalContato"><i class="fas fa-plus"></i> Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mountPEP, reMountPEP, parsePEP } from '../../modules/pep'
import { get } from '../../api/dados-unidade'

export default {
    name: 'DadosUnidade',
    data(){
        return {
            PEP: 'R.AA01.01.01.01.012',
            Empreendimento: '',
            Bloco: '',
            Unidade: '',

            dados_unidade: false,
        }
    },
    methods: {
        fetch(){
            let pieces = parsePEP(this.PEP)
 
            console.log(pieces)

            get(this.PEP).then(r => this.dados_unidade = r.results)
        }
    },
    watch: {
        PEP(){
            this.fetch()
        },
        Empreendimento(){
            this.fetch()
        },
        Bloco(){
            this.fetch()
        },
        Unidade(){
            this.fetch()
        }
    },
    mounted(){
        
    }
}
</script>