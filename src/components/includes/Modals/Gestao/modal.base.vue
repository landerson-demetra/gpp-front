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
                            <p>Você tem certeza que deseja deletar esse NAME?</p>
                        </div>
                        <div v-else>
                            <form>
                                <div class="row">
                                    BASE
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
import Bus from '../../../../bus'
import {mask} from 'vue-the-mask'

export default {
    name: 'NAME',
    props: ['action','name','title','datas'],
    directives: {mask},
    data() {
        return {

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
            
        },
        reset(){
            
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
                
            }
        }
    }
}
</script>