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
                            <div class="col-md-12 mb-3">
                                <form action="">
                                    <textarea v-model="comment" class="form-control" placeholder="Comentários a respeito da unidade..."></textarea>
                                    <div class="text-right">
                                        <button v-on:click="onSaveComment" type="submit" class="mt-2 btn btn-primary">Salvar comentário</button>
                                    </div>
                                </form>
                            </div>
                            <div v-if="!comments.length" class="col-md-12">
                                <div class="alert alert-info" role="alert">
                                    <i class="fa fa-info-circle"></i> Não há comentários ainda
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                            <div v-for="comment in comments" class="col-md-12 mb-2">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="my-0 card-title">{{ comment.user.name }}</h5>
                                        <small class="text-muted">{{ comment.created_at }}</small>
                                        <hr>
                                        <p class="card-text">{{ comment.comment }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-on:click="onClose" type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { get, store } from '../../../../api/comentarios'

export default {
    name: 'Comentarios',
    props: ['PEP'],
    data() {
        return {
            comment: null,
            comments: []
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
                this.comment = ''
                this.comments.unshift(r.results)
            })
        },
        onClose() {

        },
        fetch() {
            // Comentários
            get(this.PEP).then(r => {
                this.comments = r.results

                if(this.comments.length)
                    this.$notify({ group:'normal', text:'Há comentários nesta unidade' })
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
    }
}
</script>