<template>
    <div id="DadosUnidade" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Dados da Unidade</h3>
            </div>
            <div class="card-body">
                <form action="">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="PEP">PEP</label>
                            <input v-model="PEP" id="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99.99.9999">
                        </div>
                    </div>
<!--                     <div class="row">
                        <div class="form-group col-md-4">
                            <label for="Empreendimento">Empreendimento</label>
                            <v-select v-model="Empreendimento" name="Empreendimento" placeholder="Empreendimento" :options="this.Empreendimentos">
                                <span slot="no-options">Nenhum empreendimento encontrado.</span>
                            </v-select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Bloco">Bloco</label>
                            <select :disabled="bloco_blocked" v-model="Bloco" name="bloco" id="Bloco" class="form-control">
                                <option value="" selected>Selecione</option> 
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Unidade">Unidade</label>
                            <select :disabled="unidade_blocked" v-model="Unidade" name="bloco" id="Unidade" class="form-control">
                                <option value="" selected>Selecione</option> 
                            </select>
                        </div>
                    </div> -->
                </form>

                <hr>

                <div v-if="!dados_unidade.length" class="alert alert-secondary text-center"><i class="fas fa-exclamation-circle"></i> Nenhuma unidade selecionada</div>

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

                    <div class="row">
                        <div class="col text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#modalNovoDado"><i class="fas fa-plus"></i> Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DadosUnidadeModal action="New" name="NovoDado" title="Cadastrar Dado da Unidade"></DadosUnidadeModal>
    </div>
</template>

<script>
import Bus from '../../bus'
import DadosUnidadeModal from '../includes/Modals/DadosUnidade'
import { reMountPEP, parsePEP } from '../../modules/pep'
import { get, store } from '../../api/dados-unidade'
import { get as getE } from '../../api/empreendimentos'

export default {
    name: 'DadosUnidade',
    components: { DadosUnidadeModal },
    data(){
        return {
            isFetching: false,

            PEP: this.$route.params.pep || null,
            pepParsed: '',
            Empreendimento: '',
            Bloco: '',
            Unidade: '',

            Empreendimentos: [],
            Blocos: [],
            Unidades: [],

            bloco_blocked: true,
            unidade_blocked: true,

            dados_unidade: [],
        }
    },
    methods: {
        fetch(){
            var self = this

            // let pieces = parsePEP(this.PEP)
 
            get(this.PEP)
                .then(r => {
                    // this.Empreendimento = pieces.empreendimento
                    // this.Bloco = pieces.bloco_cod
                    // this.Unidade = pieces.unidade_cod

                    this.dados_unidade = r.results

                    console.log(r)
                })
        },
        saveDado(datas){
            datas.PEP_Unidade = this.PEP

            store(datas).then(r => {
                console.log(r)
            }).catch(e => {
                console.log(e)
            })
        }
    },
    watch: {
        PEP(pep){
            if(!pep){
                this.dados_unidade = []
            }

            this.pepParsed = parsePEP(pep)

            this.fetch()
        },
        Empreendimento(empreendimento){
            if(!empreendimento){
                this.bloco_blocked = true
                return
            }else{
                this.bloco_blocked = false
            }

            let datas = this.pepParsed
            datas.empreendimento = empreendimento.value

            console.log(reMountPEP(datas))
        },
        Bloco(){
            
        },
        Unidade(){
            
        }
    },
    mounted(){
        var self = this

        // Save events
        Bus.$on('NovoDado-onOk', datas => self.saveDado(datas))

        // var self = this

        // this.pepParsed = parsePEP(this.PEP)

        // getE()
        //     .then(r => _.forEach(r.results.data, v => self.Empreendimentos.push({ label: v.empreendimento_nome, value: v.empreendimento_cod })))
    }
}
</script>