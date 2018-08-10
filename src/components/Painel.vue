<template>
    <div id="painel" class="wow fadeIn" data-wow-duration="2s">
        <GppHeader :profile="this.profile"></GppHeader>

        <div class="clearfix"></div>

        <!-- Body -->
        <div class="container mt-5">
            <router-view class="view"></router-view>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GppHeader from './includes/GppHeader'

export default {
  name: 'Painel',
  components: { GppHeader },
  computed: mapState({profile: state => state.user.profile})
}
</script>

<style lang="scss">
    @import "../assets/scss/app";

    .content-gest{
        -webkit-transition: all .3s;
        transition: all .3s;
    }

    .show-resumo-body{
        max-height: 250px;
        overflow-y: scroll;

        ul{
            list-style-type: square;
            @extend .px-3;
        }
    }
</style>