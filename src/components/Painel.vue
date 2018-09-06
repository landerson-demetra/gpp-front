<template>
    <div id="painel" class="wow fadeIn" data-wow-duration="2s">
        <!-- Header -->
        <GppHeader></GppHeader>

        <div class="clearfix"></div>

        <!-- Body -->
        <div class="container mt-5">
            <router-view class="view"></router-view>
        </div>

        <!-- Footer -->
        <footer></footer>
    </div>
</template>

<script>
import GppHeader from './includes/GppHeader'

export default {
  name: 'Painel',
  components: { GppHeader }
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