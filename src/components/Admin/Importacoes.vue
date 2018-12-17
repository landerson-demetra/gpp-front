<template>
    <div>
        <div class="row">
            <div class="mb-5 col-md-12 col-lg-12">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-primary text-white">
                        <div class="row">
                            <h3 class="col-md-7 mt-0">Importações</h3>
                        </div>
                    </div>
                    <div class="card-body">Em construção...</div>
                    <div class="card-footer bg-primary text-white border-0 text-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { resumo } from '../../api/gestao'

export default {
    data() {
        return {
            datas: []
        }
    },
    mounted() {
        resumo().then(r => this.datas = r.results)
    }
}
</script>