<template>
    <div id="painel" class="wow fadeIn">
        <div class="gpp-header">
            <div class="container">
                <div class="row">
                    <ul class="col-md-9">
                        <li><a href="#">Item 1</a></li>
                        <li><a href="#">Item 2</a></li>
                        <li><a href="#">Item 3</a></li>
                        <li><a href="#">Item 4</a></li>
                        <li><a href="#">Item 5</a></li>
                        <li><a href="#">Item 6</a></li>
                    </ul>

                    <ul class="col-md-3">
                        <li><a href="#"><i class="fas fa-user"></i>  Landerson</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="mt-5 container">
           <div class="row"><h3>Dashboard</h3></div>

            <div class="row mt-3">
                <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h5 class="card-title">58 Patrimônios</h5>
                        <p class="card-text">Patrimônios cadastrados nas ultimas 3 semanas</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Painel'
}
</script>

<style lang="scss">
    @import "../assets/scss/app";
</style>