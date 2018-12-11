<template>
    <div>
        <div class="modal fade" id="modalComentarios" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalComentariosLabel">Comentários <small v-if="pepValid" class="opacity-small">[ {{ this.PEP }} ]</small></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div v-if="!comments.length" class="col-md-12">
                                <div class="alert alert-info" role="alert">
                                    <i class="fa fa-info-circle"></i> Não há comentários ainda
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-12 max-comments border-bottom">
                                <div v-for="comment in comments" class="mb-2">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="my-0 card-title">{{ comment.user.name }}</h5>
                                            <small class="text-muted">{{ comment.created_at }}</small>
                                            <hr>
                                            <p class="card-text" v-html="comment.comment"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 py-3">
                                <vue-editor id="editor" v-model="comment" :editorToolbar="toolbar"></vue-editor>
                                <!-- <textarea v-model="comment"  class="form-control" placeholder="Comentários a respeito da unidade..."></textarea> -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="onSaveComment" type="submit" class="mt-2 btn btn-primary">Salvar comentário</button>
                        <button v-on:click="onClose" type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../../../../bus'

import { VueEditor } from 'vue2-editor'
import { get, store } from '../../../../api/comentarios'

export default {
    name: 'Comentarios',
    props: ['PEP'],
    components: {
        VueEditor
    },
    data() {
        return {
            comment: null,
            comments: [],
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{list: 'ordered'},{list: 'bullet'}],
                ['code-block', 'blockquote']
            ]
        }
    },
    watch: {
        PEP() {
            if(!this.pepValid) return
            //
            this.fetch()
        }
    },
    methods: {
        onSaveComment() {
            store({
                comment: this.comment,
                PEP: this.PEP
            }).then(r => {
                this.comment = null
                this.comments.unshift(r.results)

                // Incrementando
                Bus.$emit('countComments', this.comments.length)

                this.$notify({ group: 'normal', type: 'success', text: 'Comentário salvo com sucesso' })

                //
                $('.modal').modal('hide')
            })
        },
        onClose() {},
        fetch() {
            // Comentários
            get(this.PEP).then(r => {
                this.comments = r.results

                let count = this.comments.length

                if(count) {
                    Bus.$emit('countComments', count)
                    this.$notify({ group:'keep', text:'Há comentários nesta unidade' })
                }
            })
        }
    },
    computed: {
        pepValid() {
            return this.PEP && this.PEP.length == 20
        }
    },
    mounted() {
        if(this.pepValid)
            this.fetch()
    },
    beforeDestroy() {
        Bus.$off()
    }
}
</script>

<style lang="scss">
.max-comments{
    max-height: 430px;
    overflow-y: scroll;
}
</style>