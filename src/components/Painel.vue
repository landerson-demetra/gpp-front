<template>
    <div id="painel" class="wow fadeIn">
        <div class="gpp-header">
            <div class="container">
                <ul>
                    <li><a href="#">Item 1</a></li>
                </ul>
            </div>
        </div>

        <div class="container">
            <div class="main-content">
                Content
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

    .main-content{
        padding: 1.25rem;
        box-shadow: 0 0 .3em #CCC;
    }
</style>