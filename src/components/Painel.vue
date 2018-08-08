<template>
    <div id="painel" class="wow fadeIn" data-wow-duration="2s">
        <GppHeader :profile="this.profile"></GppHeader>

        <div class="clearfix"></div>

        <!-- Body -->
        <div class="container mt-5">
            <div class="card shadow border-0">
                <div class="card-header border-0 bg-white">
                    <h3 class="mt-0">Gestão de Patrimônios</h3>
                </div>
                <div class="card-body">
                    <form action="#noaction">
                        <div class="row">
                            <div class="col-md-3">
                                <label for="PEP">PEP</label>
                                <input id="PEP" type="text" class="form-control" placeholder="R.XXXX.99.99.99.9999">
                            </div>
                            <div class="col-md-2">
                                <label for="Contribuinte">Contribuinte</label>
                                <input id="Contribuinte" type="text" class="form-control" placeholder="NºContribuinte" disabled>
                            </div>
                            <div class="col-md-1">
                                <label for="Vendido">Vendido</label>
                                <input id="Vendido" type="text" class="form-control" placeholder="Não" disabled>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="card-footer bg-primary text-white border-0 text-right">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-primary"><i class="fas fa-print"></i> Imprimir</button>
                        <div class="dropup">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><i class="fas fa-file-export"></i> Exportar</button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#"><i class="fas fa-file-pdf"></i> PDF</a>
                                <a class="dropdown-item" href="#"><i class="fas fa-file-excel"></i> CSV</a>
                                <a class="dropdown-item" href="#"><i class="fas fa-file-excel"></i> XLSX</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GppHeader from './includes/GppHeader'

import { mapState } from 'vuex'

export default {
  name: 'Painel',
  components: { GppHeader },
  computed: mapState({profile: state => state.user.profile})
}
</script>

<style lang="scss">
    @import "../assets/scss/app";
</style>