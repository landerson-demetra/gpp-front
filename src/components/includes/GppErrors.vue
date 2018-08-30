<template>
    <div class="alert alert-secondary">
        <ul>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </ul>
    </div>
</template>

<script>
import Bus from '../../bus'

export default {
    name: 'GppErrors',
    data() {
        return {
            errors: []
        }
    },
    created() {
        Bus.$on('response-errors', (errs) => this.errors = errs)
    }
}
</script>