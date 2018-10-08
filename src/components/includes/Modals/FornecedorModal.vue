<template>
    <div>
        <div class="modal fade" :id="'modal' + this.name" tabindex="-1" role="dialog">
            <div class="modal-dialog shadow" :class="{'modal-lg': this.action !== 'Delete'}" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" :id="'modal' + this.name + 'Label'">{{ this.title }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="this.action == 'Delete'">
                            <p>Você tem certeza que deseja deletar o fornecedor <b>{{ this.datas.nome }}</b> e todos os seus <b>contatos</b>?</p>
                            <p><div class="badge badge-primary p-2" v-for="segmento in this.datas.segmentos">{{ segmento }}</div></p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row">
                                    <div class="form-group col-lg-9">
                                        <label for="name">Nome <span class="text-danger">*</span></label>
                                        <input v-model="Nome" id="name" type="text" class="form-control" placeholder="Nome do fornecedor..." required="">
                                    </div>
                                    <div class="form-group col-lg-3">
                                        <label for="numero_sap">Número SAP <span class="text-danger">*</span></label>
                                        <input v-model="NumeroSAP" v-mask="['########','#########']" type="text" id="numero_sap" placeholder="Número SAP..." class="form-control" required="">
                                    </div>
                                     <div class="form-group col-lg-12">
                                        <label for="Segmento">Segmento(s) <span class="text-danger">*</span></label>
                                        <v-select :close-on-select="false" taggable push-tags v-model="Segmentos" placeholder="Selecione um ou mais segmento(s)..." multiple :options="['Prefeitura', 'Administradora', 'Fornecedor SAP', 'Fornecedor Água', 'Fornecedor Luz']"></v-select>
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="cpf_cnpj">CNPJ/CPF <span class="text-danger">*</span></label>
                                        <input v-model="cpf_cnpj" id="cpf_cnpj" v-mask="['###.###.###-##', '##.###.###/####-##']" name="cnpj_cpf" type="text" placeholder="CNPJ/CPF do fornecedor..." class="form-control" required="">
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label for="site">Site</label>
                                        <input v-model="Site" type="text" id="site" placeholder="Site..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-12">
                                        <label for="Responsavel">Responsável</label>
                                        <input v-model="Responsavel" id="Responsavel" type="text" placeholder="Responsável..." class="form-control">
                                    </div>

                                    <div class="col-12"><h5>Endereço</h5><hr></div>

                                    <div class="form-group col-lg-4">
                                       <label for="CEP">CEP</label>
                                       <input v-model="CEP" v-on:input="CEPchange" :class="{'is-invalid': CEPHasError}" v-mask="['#####-###']" type="text" placeholder="CEP..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                       <label for="Logradouro">Logradouro</label>
                                       <input v-model="Logradouro" type="text" placeholder="Logradouro..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                       <label for="Numero">Número</label>
                                       <input v-model="Numero" ref="numero" type="text" placeholder="Número..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="Estado">Bairro</label>
                                        <input v-model="Bairro" type="text" placeholder="Bairro..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="Estado">Estado</label>
                                        <input v-model="Estado" type="text" placeholder="Estado..." class="form-control">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="Cidade">Cidade</label>
                                        <input v-model="Cidade" type="text" placeholder="Cidade..." class="form-control">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="this.action !== 'Delete'">
                            <button type="button" class="btn btn-default" v-on:click="this.closeEvent" data-dismiss="modal">Fechar</button>
                            <button v-on:click.prevent="emitOkEvent" type="button" class="btn btn-primary"><i class="fas fa-check"></i> Salvar</button>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                            <button v-if="this.action == 'Delete'" v-on:click="this.emitOkEvent" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Sim, tenho.</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../../bus'
import {mask} from 'vue-the-mask'

export default {
    name: 'FornecedorModal',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return  {
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
        }
    },
    methods: {
        emitOkEvent(){
            Bus.$emit('ev' + this.name, (this.action !== 'Delete' ? this.getFields : true))

            this.reset()
        },
        closeEvent(){
            if(this.action == 'New')
                this.reset()
        },
        CEPchange(cep){
            if(this.CEP && this.CEP.length < 9) return

            this.$http.get(_.replace(this.$config.cep_url, '{cep}', this.CEP)).then(r => this.assignCepValues(r.data))
        },
        assignCepValues(r){
            if(r.resultado == 0){
                this.CEPHasError = true

                this.Logradouro = ''
                this.Bairro = ''
                this.Estado = ''
                this.Cidade = ''

                return
            }

            this.$refs.numero.focus()

            this.CEPHasError = false

            this.Logradouro = (r.tipo_logradouro + ' ' + r.logradouro).trim()
            this.Bairro = r.bairro
            this.Estado = r.uf
            this.Cidade = r.cidade
        },
        fill(){
            this.Nome = this.datas.nome
            this.NumeroSAP = this.datas.numero_sap
            this.cpf_cnpj = this.datas.cnpj_cpf
            this.Site = this.datas.site
            this.Segmentos = this.datas.segmentos
            this.Responsavel = this.datas.responsavel
            //
            this.CEP = this.datas.end_cep
            this.Logradouro = this.datas.end_logradouro
            this.Numero = this.datas.end_numero
            this.Bairro = this.datas.end_bairro
            this.Estado = this.datas.end_estado
            this.Cidade = this.datas.end_cidade
        },
        reset(){
            this.Nome = ''
            this.NumeroSAP = ''
            this.cpf_cnpj = ''
            this.Site = ''
            this.Segmentos = ''
            this.Responsavel = ''
            //
            this.CEPHasError = false
            this.CEP = ''
            this.Logradouro = ''
            this.Numero = ''
            this.Bairro = ''
            this.Estado = ''
            this.Cidade = ''
        }
    },
    watch: {
        datas(){
            if(this.action == 'Edit')
                this.fill()
        }
    },
    computed: {
        getFields() {
            return {
                nome: this.Nome,
                numero_sap: this.NumeroSAP,
                segmentos: this.Segmentos,
                cnpj_cpf: this.cpf_cnpj,
                site: this.Site,
                responsavel: this.Responsavel,
                end_cep: this.CEP,
                end_logradouro: this.Logradouro,
                end_numero: this.Numero,
                end_bairro: this.Bairro,
                end_estado: this.Estado,
                end_cidade: this.Cidade,
            }
        }
    }
}
</script>