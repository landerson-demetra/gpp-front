<template>
    <div>
        <div class="row">
            <div class="content-gest mb-5 col-md-12 col-lg-12">
                <div class="card shadow border-0">
                    <div class="card-header border-0 bg-primary text-white">
                        <div class="row">
                            <h3 class="col-md-7 mt-0">Gerar relatório</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        
                    </div>
                    <div class="card-footer bg-primary text-white border-0 text-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <a href="#relatorio" class="btn btn-primary"><i class="fas fa-file-export"></i> Gerar relatório</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
    name: 'Relatorio',
    components: {
        Datepicker
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>