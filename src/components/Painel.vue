<template>
    <div id="painel" class="wow fadeIn" data-wow-duration="2s">
        <!-- Header -->
        <GppHeader></GppHeader>

        <div class="clearfix"></div>

        <!-- Body -->
        <div class="container mt-5">
            <router-view class="view"></router-view>
        </div>

        <IndicesModal></IndicesModal>

        <!-- Footer -->
        <!-- <GppFooter></GppFooter> -->
    </div>
</template>

<script>
import GppHeader from './includes/GppHeader'
import GppFooter from './includes/GppFooter'
import IndicesModal from './includes/Modals/IndicesModal'

export default {
    name: 'Painel',
    components: { GppHeader, GppFooter, IndicesModal }
}
</script>

<style lang="scss">
    @import "../assets/scss/app";

    .show-resumo-body{
        max-height: 250px;
        overflow-y: scroll;

        ul{
            list-style-type: square;
            @extend .px-3;
        }
    }
</style>