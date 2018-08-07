<template>
    <div id="notfound" class="wow fadeIn">
        <div class="gpp-header"></div>

        <div class="flex-center position-ref full-height">
            <div class="content">
                <div class="title text-muted">
                    Página não encontrada
                </div>
                <a href="#" onclick="window.history.go(-1); return false;" class="btn btn-primary"> <i class="fas fa-long-arrow-alt-left"></i> Voltar</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>

<style lang="scss">
    .full-height {
        height: 100vh;
    }

    .flex-center {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .position-ref {
        position: relative;
    }

    .content {
        text-align: center;
    }

    .title {
        font-size: 36px;
        padding: 20px;
    }
</style>