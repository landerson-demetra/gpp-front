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
    components: { GppHeader },
    data(){
        return {
            valor: 629.00,
            multa: 2,
            juros: 1,
            correcao: 0,
            venc_parc: '10/05/2016',
        }
    },
    methods: {
        monthDiff(d1, d2){
            let months

            months = (d2.getFullYear() - d1.getFullYear()) * 12
            months -= d1.getMonth() + 1
            months += d2.getMonth()

            return months <= 0 ? 0 : months
        }
    },
    mounted(){
        return;
        console.clear()

        console.log('===================================')
        console.log('Valor: R$ ' + this.valor)
        console.log('Multa: ' + this.multa + '%')
        console.log('Juros: ' + this.juros + '%')
        console.log('Correção: ' + this.correcao + '%')
        console.log('Vencimento: ' + this.venc_parc)
        console.log('============ [ RESULTS ] ============')

        var vencDate = new Date(this.venc_parc),
            nowDate = new Date(),
            timeDiff = this.monthDiff(vencDate, nowDate)

        console.log('Data parcela: ' + vencDate)
        console.log('Data atual: ' + nowDate)
        console.log('Diferença: ' + timeDiff)
        console.log('Total: ' + 2)

        console.log('===================================')
    }
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