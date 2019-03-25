<template>
    <div>
        <div class="modal fade" id="modalIndices" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-lg shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalResumoLabel">Índices</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form method="POST" v-on:submit.prevent>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <input type="text" class="form-control" placeholder="Mês do índice...">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { resumo } from '../../../api/gestao'
import GridLoader from 'vue-spinner/src/GridLoader'

export default {
    name: 'IndicesModal',
    components: { GridLoader },
    data: () => ({

    }),
    methods: {

    },
    mounted() {

    }
}
</script>