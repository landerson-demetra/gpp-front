<template>
  <div id="login">
    <div class="container">
        <div class="row mt-5 login">
            <div class="card col-md-4 offset-md-4 align-self-center">
                <div class="wow fadeIn card-body">
                    <img class="img-fluid mx-auto d-block mb-3" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Pdg.jpg" alt="PDG">
                    <form action="" method="POST">
                        <div class="form-group">
                            <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Digite seu email">
                        </div>
                        <div class="form-group">
                            <input v-model="password" type="password" class="form-control" aria-describedby="passwordHelp" placeholder="Digite a sua senha">
                        </div>

                        <button v-on:click.prevent="Login()" type="submit" class="btn mt-4 btn-block btn-primary">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
        email: '',
        password: ''
    }
  },
  methods: {
    Login: function(){
        
    }
  }
}
</script>

<style lang="scss">
    @import "../assets/scss/app";

    .card img{
        width: 30%;
    }
</style>