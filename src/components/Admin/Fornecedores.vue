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
                                <option value="">N/Informado</option>
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

                <div v-else>
                    <div class="row fornecedor-infos" :class="{'is-fetching': isFetching}">
                        <div class="form-group col-lg-6"><b>CPF/CNPJ:</b> <span>{{ this.fornecedor_selected_datas.cnpj_cpf }}</span></div>
                        <div class="form-group col-lg-6"><b>Segmento:</b> <span v-if="this.fornecedor_selected_datas.segmentos">{{ this.fornecedor_selected_datas.segmentos.join(', ') }}</span></div>
                        <div class="form-group col-lg-6"><b>Endereço:</b> <span>{{ this.mountEndereco }}</span></div>
                        <div class="form-group col-lg-6"><b>CEP:</b> <span>{{ this.fornecedor_selected_datas.end_cep }}</span></div>
                        <div class="form-group col-lg-6"><b>Cidade:</b> <span>{{ this.fornecedor_selected_datas.end_cidade }}</span></div>
                        <div class="form-group col-lg-6"><b>Estado:</b> <span>{{ this.fornecedor_selected_datas.end_estado }}</span></div>
                        <div class="form-group col-lg-6"><b>Site:</b> <span>{{ this.fornecedor_selected_datas.site }}</span></div>
                        <div class="form-group col-lg-6"><b>Responsável:</b> <span>{{ this.fornecedor_selected_datas.responsavel_id }}</span></div>
                    </div>

                    <div class="row mb-4">
                        <div class="col text-right">
                            <button class="btn btn btn-warning mr-1" data-toggle="modal" data-target="#modalEditarFornecedor"><i class="fas fa-edit"></i> Editar</button>
                            <button class="btn btn btn-danger"><i class="fas fa-trash"></i> Excluir</button>
                        </div>
                    </div>

                    <hr>
                </div>

                <div v-if="fornecedor_selected" :class="{'is-fetching': isFetching}">
                    <div v-if="!this.fornecedor_selected_contatos.length">
                        <h3 class="p-3 text-muted text-center">Nenhum contato cadastrado</h3>
                    </div>
                    <div v-else>
                        <h5 class="my-4">Dados de contato</h5>

                        <div class="row mt-3 no-gutters">
                            <table class="table table-hover table-bordered table-responsive w-100 d-block d-md-table table-striped border-top-0">
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
                                    <tr v-for="contato in this.fornecedor_selected_contatos">
                                        <th>{{ contato.nome }}</th>
                                        <td>{{ (contato.departamento ? contato.departamento : 'N/Informado') }}</td>
                                        <td>{{ (contato.email ? contato.email : 'N/Informado') }}</td>
                                        <td>{{ (contato.telefone ? contato.telefone : 'N/Informado') }}</td>
                                        <td>{{ (contato.celular ? contato.celular : 'N/Informado') }}</td>
                                        <td><div class="action-buttons"><button class="btn btn-warning"><i class="fa fa-edit"></i></button><button class="btn btn-danger"><i class="fa fa-trash"></i></button></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col no-gutters text-right">
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
                        <FornecedorForm></FornecedorForm>
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
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Editar Fornecedor -->
        <div class="modal fade" id="modalEditarFornecedor" tabindex="-1" role="dialog" aria-labelledby="modalEditarFornecedorLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalEditarFornecedorLabel">Dados de contato</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <FornecedorForm></FornecedorForm>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button v-on:click="updateFornecedor()" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../bus'
import FornecedorForm from '../includes/FornecedorForm'
import {
    get,
    store, 
    update,
    deletedata
} from '../../api/fornecedor'
import {
    get as getC,
    store as storeC,
    update as updateC, 
    deletedatas as deleteC
} from '../../api/fornecedor-contato'

export default {
    name: 'Fornecedores',
    components: { FornecedorForm },
    data() {
        return  {
            isFetching: false,

            fornecedores: [],
            fornecedor_selected: false,
            fornecedor_selected_datas: [],
            fornecedor_selected_contatos: [],

            // Form fornecedor
            Nome: '',
            NumeroSAP: '',
            cpf_cnpj: '',
            Site: '',
            Segmentos: [],

            CEPHasError: false,

            CEP: '',
            Logradouro: '',
            Numero: '',
            Bairro: '',
            Estado: '',
            Cidade: '',

            Responsavel: '',

            // Form novo contato
            NomeC: '',
            DepartamentoC: '',
            EmailC: '',
            TelefoneC: '',
            CelularC: '',
        }
    },
    watch: {
        fornecedor_selected(selected){
            if(!selected) return

            // Devemos resetar os contatos
            this.fornecedor_selected_contatos = []

            // Dados do fornecedor
            get({ id: selected.value }).then(r => this.fornecedor_selected_datas = r.results)

            // Contatos do fornecedor
            getC({ fornecedor_id: selected.value }).then(r => this.fornecedor_selected_contatos = r.results)
        },
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

                // Dados do fornecedor recém criado
                this.fornecedor_selected = r.results.nome
                this.fornecedor_selected_datas = r.results

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
            let fields = this.getFields
            fields.id = this.fornecedor_selected.value

            update(fields).then(r => {
                console.log()
            }).catch(e => {
                console.log(e)
            })
        }
    },
    computed: {
        mountEndereco() {
            if(
                !this.fornecedor_selected_datas.end_logradouro ||
                !this.fornecedor_selected_datas.end_bairro ||
                !this.fornecedor_selected_datas.end_cidade ||
                !this.fornecedor_selected_datas.end_estado
            )
                return 'N/Informado'

            return  this.fornecedor_selected_datas.end_logradouro + ', ' + 
                    this.fornecedor_selected_datas.end_bairro + ', ' +
                    this.fornecedor_selected_datas.end_cidade + ' - ' +
                    this.fornecedor_selected_datas.end_estado
        },
        getFields() {
            return {
                'nome': this.Nome,
                'numero_sap': this.NumeroSAP,
                'segmentos': this.Segmentos,
                'cnpj_cpf': this.cpf_cnpj,
                'site': this.Site,
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
        Bus.$on('isFetching', is => this.isFetching = is)

        /* Obtendo a lista de fornecedores */
        get().then(r => {
            _.forEach(r.results, (v,k) => {
                this.fornecedores.push({ label: v.nome, value: v.id })
            })
        })
    }
}
</script>

<style lang="scss">
    .fornecedor-infos{
        span{
            margin-left: 5px;
        }
    }
</style>