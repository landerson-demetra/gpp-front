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
                            <p>Você tem certeza que deseja deletar o empreendimento <b>{{ this.datas.empreendimento_nome }}</b>?</p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row">
                                    <div class="form-group col-lg-4">
                                        <label for="spe">SPE</label>
                                        <input id="spe" class="form-control" v-model="SPE" type="text">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="spe_cnpj">SPE CNPJ</label>
                                        <the-mask id="spe_cnpj" class="form-control" :mask="['##.###.###/####-##']" v-model="SPE_CNPJ" type="text" :masked="false" placeholder="Razão social SPE"></the-mask>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="spe_razao">SPE Razão Social</label>
                                        <input id="spe_razao" class="form-control" placeholder="Razão Social..." v-model="SPE_RS" type="text">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="cod_empre">Código</label>
                                        <input id="cod_empre" class="form-control" v-model="EmpreCod" type="text">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="nome_empre">Nome</label>
                                        <input id="nome_empre" class="form-control" v-model="EmpreNome" type="text">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label for="fase">Fase</label>
                                        <input id="fase" class="form-control" v-model="Fase" type="text">
                                    </div>
                                </div>
                            </form>

                            <div class="alert alert-warning">Ao mudar SPE, Fase ou o código do empreendimento, todas as unidades do mesmo serão afetadas.</div>
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
    name: 'EmpreendimentoModal',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return {
            SPE: '',
            SPE_CNPJ: '',
            SPE_RS: '',
            EmpreCod: '',
            EmpreNome: '',
            Fase: ''
        }
    },
    methods: {
        emitOkEvent(){
            Bus.$emit('ev' + this.name, (this.action !== 'Delete' ? this.getFields : true))

            if(this.action == 'New')
                this.reset()
        },
        closeEvent(){
            if(this.action == 'New')
                this.reset()
        },
        fill(){
            this.SPE = this.datas.spe
            this.SPE_CNPJ = this.datas.spe_cnpj
            this.SPE_RS = this.datas.spe_razao_social
            this.EmpreCod = this.datas.empreendimento_cod
            this.EmpreNome = this.datas.empreendimento_nome
            this.Fase = this.datas.fase
        },
        reset(){
            this.SPE = ''
            this.SPE_CNPJ = ''
            this.SPE_RS = ''
            this.EmpreCod = ''
            this.EmpreNome = ''
            this.Fase = ''
        }
    },
    watch: {
        datas(){
            console.log(this.datas)
            if(this.action == 'Edit')
                this.fill()
        }
    },
    computed: {
        getFields() {
            return {
                spe: this.SPE,
                spe_cnpj: this.SPE_CNPJ,
                spe_razao_social: this.SPE_RS,
                empreendimento_cod: this.EmpreCod,
                empreendimento_nome: this.EmpreNome,
                fase: this.Fase
            }
        }
    }
}
</script>