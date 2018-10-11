<template>
    <div>
        <div class="modal fade" id="modalAcoesJudiciais" tabindex="-1" role="dialog">
            <div class="modal-lg modal-dialog shadow" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalAcoesJudiciaisLabel">Ações Judiciais [ PEP ]</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">Ações Judiciais serão listadas aqui.</div>
                    <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AcoesJudiciais',
}
</script>