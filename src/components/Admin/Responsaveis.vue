<template>
    <div id="fornecedores" class="wow fadeIn" data-wow-duration="2s">
        <div class="card shadow border-0">
            <div class="card-header border-0 bg-primary text-white">
                <h3 class="mt-0">Cadastro</h3>
            </div>
            <div class="card-body">
                <form method="POST" v-on:submit.prevent>
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
                        <div class="form-group col-lg-6"><b>Segmento(s):</b> <span v-if="this.fornecedor_selected_datas.segmentos">{{ this.fornecedor_selected_datas.segmentos.join(', ') }}</span></div>
                        <div class="form-group col-lg-6"><b>Endereço:</b> <span>{{ this.mountEndereco }}</span></div>
                        <div class="form-group col-lg-6"><b>CEP:</b> <span>{{ this.fornecedor_selected_datas.end_cep }}</span></div>
                        <div class="form-group col-lg-6"><b>Cidade:</b> <span>{{ this.fornecedor_selected_datas.end_cidade }}</span></div>
                        <div class="form-group col-lg-6"><b>Estado:</b> <span>{{ this.fornecedor_selected_datas.end_estado }}</span></div>
                        <div class="form-group col-lg-6"><b>Site:</b> <span><a :href="this.fornecedor_selected_datas.site" target="_blank">{{ this.fornecedor_selected_datas.site }}</a></span></div>
                        <div class="form-group col-lg-6"><b>Responsável:</b> <span>{{ this.fornecedor_selected_datas.responsavel }}</span></div>
                    </div>

                    <div class="row mb-4">
                        <div class="col text-right">
                            <button class="btn btn btn-warning mr-1" data-toggle="modal" data-target="#modalEditarFornecedor"><i class="fas fa-edit"></i> Editar</button>
                            <button class="btn btn btn-danger" data-toggle="modal" data-target="#modalDeletarFornecedor"><i class="fas fa-trash"></i> Excluir</button>
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
                                        <td>
                                            <div class="action-buttons">
                                                <button v-on:click="setContatoDatas(contato)" data-toggle="modal" data-target="#modalEditarContato" class="btn btn-warning"><i class="fa fa-edit"></i></button>
                                                <button v-on:click="setContatoDatas(contato)" data-toggle="modal" data-target="#modalDeletarContato" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col no-gutters text-right">
                            <button class="btn btn btn-success" data-toggle="modal" data-target="#modalNovoContato"><i class="fas fa-plus"></i> Adicionar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Novo Fornecedor -->
        <FornecedorModal action="New" name="NovoFornecedor" title="Cadastrar Fornecedor"></FornecedorModal>

        <!-- Modal Editar Fornecedor -->
        <FornecedorModal action="Edit" name="EditarFornecedor" title="Editar Fornecedor" :datas="this.fornecedor_selected_datas"></FornecedorModal>

        <!-- Modal Deletar Fornecedor -->
        <FornecedorModal action="Delete" name="DeletarFornecedor" title="Deletar Fornecedor" :datas="this.fornecedor_selected_datas"></FornecedorModal>

        <!-- Modal Novo Contato -->
        <FornecedorContato action="New" name="NovoContato" title="Adicionar um contato"></FornecedorContato>

        <!-- Modal Editar Contato -->
        <FornecedorContato action="Edit" name="EditarContato" title="Editar contato" :datas="this.fornecedor_selected_contatos_active"></FornecedorContato>

        <!-- Modal Delete Contato -->
        <FornecedorContato action="Delete" name="DeletarContato" title="Deletar Contato" :datas="this.fornecedor_selected_contatos_active"></FornecedorContato>
    </div>
</template>

<script>
import Bus from '../../bus'
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
    deletedata as deleteC
} from '../../api/fornecedor-contato'

// Components
import FornecedorModal from '../includes/Modals/FornecedorModal'
import FornecedorContato from '../includes/Modals/FornecedorContato'

export default {
    name: 'Fornecedores',
    components: {
        FornecedorModal,
        FornecedorContato
    },
    data() {
        return  {
            isFetching: false,

            fornecedores: [],
            fornecedor_selected: false,
            fornecedor_selected_datas: [],
            fornecedor_selected_contatos: [],
            fornecedor_selected_contatos_active: []
        }
    },
    methods: {
        /*==================================
        =            Fornecedor            =
        ==================================*/
        saveFornecedor(datas){
            store(datas).then(r => {
                // Adicionando o forncedor recém criado á lista de fornecedores
                this.fornecedores.push({ label: r.results.nome, value: r.results.id })

                // Atribuindo os dados do fornecedor recém criado
                this.fornecedor_selected = this.fornecedores[this.fornecedores.length - 1]
                this.fornecedor_selected_datas = r.results

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Fornecedor cadastrado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return
                this.$notify({group:'normal', type:'error', title:'Ops :/', text:'Ocorreu um erro inesperado'})
            })
        },
        updateFornecedor(fields){
            update(this.fornecedor_selected.value, fields).then(r => {
                // Atualizando os dados novos
                this.fornecedor_selected.label = r.results.nome
                this.fornecedor_selected_datas = r.results

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Fornecedor editado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return

                this.$notify(this.$config.errors.unexpected)
            })
        },
        deleteFornecedor(){
            deletedata(this.fornecedor_selected.value).then(r => {
                // Removendo o fornecedor deletado da lista de fornecedores
                let index = this.fornecedores.map((e) => e.value).indexOf(this.fornecedor_selected.value)
                this.fornecedores.splice(index, 1)

                // Resetando os dados do fornecedor selecionado
                this.fornecedor_selected = false
                this.fornecedor_selected_datas = []
                this.fornecedor_selected_contatos = []

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Fornecedor deletado com sucesso'})
            }).catch(e => {
                if(e.response.status < 423) return
                this.$notify(this.$config.errors.unexpected)
            })

            // Fechando a modal
            $('.modal').modal('hide')
        },
        /*=====  End of Fornecedor  ======*/

        /*==============================================
        =            Contatos do forneced+or            =
        ==============================================*/
        saveContato(datas){
            datas.fornecedor_id = this.fornecedor_selected.value

            storeC(datas).then(r => {
                this.fornecedor_selected_contatos.push({
                    nome: r.results.nome,
                    email: r.results.email,
                    departamento: r.results.departamento,
                    telefone: r.results.telefone,
                    celular: r.results.celular
                })

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Contato do fornecedor criado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return
                this.$notify(this.$config.errors.unexpected)
            })
        },
        updateContato(fields){
            fields.id = this.fornecedor_selected_contatos_active.id

            updateC(fields).then(r => {
                // Encontrando o índice do contato recém atualizado na lista de fornecedores
                let index = this.fornecedor_selected_contatos.map(e => e.id).indexOf(this.fornecedor_selected_contatos_active.id)
                this.fornecedor_selected_contatos[index] = r.results

                // Forçando a atualização da DOM
                this.$forceUpdate()

                // Notificando o usuário
                this.$notify({group:'normal', type:'success', text:'Contato do fornecedor editado com sucesso'})

                // Fechando a modal
                $('.modal').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return

                this.$notify(this.$config.errors.unexpected)
            })
        },
        deleteContato(){
            deleteC(this.fornecedor_selected_contatos_active.id).then(r => {
                // Removendo o fornecedor deletado da lista de fornecedores
                let index = this.fornecedor_selected_contatos.map((e) => e.id).indexOf(this.fornecedor_selected_contatos_active.id)
                this.fornecedor_selected_contatos.splice(index, 1)

                // Resetando
                this.fornecedor_selected_contatos_active = ''

                // Notificando o usuário
                this.$notify({group: 'normal', type: 'success', text: 'Contato do fornecedor deletado com sucesso'})

                $('.modal').modal('hide')
            }).catch(e => {
                if(e.response.status < 423) return
                this.$notify(this.$config.errors.unexpected)
            })
        },
        setContatoDatas(datas){
            this.fornecedor_selected_contatos_active = datas
        }
        /*=====  End of Contatos do fornecedor  ======*/
    },
    watch: {
        fornecedor_selected(selected){
            if(!selected) return

            // Devemos resetar os contatos
            this.fornecedor_selected_contatos = []

            // Dados do fornecedor
            get({ id: selected.value })
                .then(r => this.fornecedor_selected_datas = r.results)

            // Contatos do fornecedor
            getC({ fornecedor_id: selected.value })
                .then(r => this.fornecedor_selected_contatos = r.results)
        }
    },
    computed: {
        mountEndereco() {
            let datas = this.fornecedor_selected_datas

            if(!datas.end_logradouro || !datas.end_bairro || !datas.end_cidade || !datas.end_estado)
                return 'N/Informado'

            return  datas.end_logradouro + ' - ' + 
                    datas.end_numero + ', ' +
                    datas.end_bairro + ', ' +
                    datas.end_cidade + ' - ' +
                    datas.end_estado
        }
    },
    mounted() {
        var self = this

        // Lista de fornecedores
        get()
            .then(r => _.forEach(r.results, v => self.fornecedores.push({ label: v.nome, value: v.id })))

        // isFetching trick
        Bus.$on('isFetching', is => self.isFetching = is)

        // Save events
        Bus.$on('evNovoFornecedor', datas => self.saveFornecedor(datas))
        Bus.$on('evNovoContato', datas => self.saveContato(datas))

        // Edit events
        Bus.$on('evEditarFornecedor', datas => self.updateFornecedor(datas))
        Bus.$on('evEditarContato', datas => self.updateContato(datas))

        // Delete events
        Bus.$on('evDeletarFornecedor', r => self.deleteFornecedor())
        Bus.$on('evDeletarContato', r => self.deleteContato())
    },
    beforeDestroy(){
        Bus.$off()
        // Bus.$off([
        //     'evNovoFornecedor',
        //     'evNovoContato',
        //     'evEditarFornecedor',
        //     'evEditarContato',
        //     'evDeletarFornecedor',
        //     'evDeletarContato'
        // ])
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