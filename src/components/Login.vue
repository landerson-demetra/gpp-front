<template>
    <div id="login" class="wow fadeIn">
        <div class="gpp-header"></div>

        <div class="clearfix"></div>

        <div class="container">
            <div class="login-container">
                <div class="row login">
                    <div class="card col-md-4 col-12 offset-md-4 align-self-center">
                        <div class="card-body">
                            <img class="img-fluid mx-auto d-block mb-3" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Pdg.jpg" alt="PDG">
                            <form v-on:submit="checkForm" action="" method="POST">
                                <div class="form-group">
                                    <input v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Digite seu email">
                                </div>
                                <div class="form-group">
                                    <input v-model="password" type="password" class="form-control" aria-describedby="passwordHelp" placeholder="Digite a sua senha">
                                </div>

                                <button :disabled="this.authenticating" type="submit" class="btn mt-4 btn-block btn-primary">Entrar</button>
                            </form>

                            <!-- Erros -->
                            <div v-for="error in errors" class="alert alert-secondary mt-3 " role="alert">
                               <i class="fas fa-exclamation-triangle"></i> {{ error }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config'
import { AUTH_REQUEST } from '../store/actions/auth'

export default {
  name: 'Login',
  data() {
    return {
        authenticating: false,
        errors: [],
        email: 'clandokca@gmail.com',
        password: '123'
    }
  },
  methods: {
    checkForm: function(e) {
        e.preventDefault()

        this.errors = []

        if(this.email && this.password){
            return this.Login()
        }

        if(!this.email){
            this.errors.push('Você precisa informar um e-mail')
        }

        if(!this.password){
            this.errors.push('Você precisa informar uma senha')
        }
    },
    Login: function() {
        this.authenticating = true

        this.$store.dispatch(AUTH_REQUEST, this.makeauth).then(() => {
            this.$router.push({ name: 'painel' })
        }).catch(() => {
            this.authenticating = false
            this.errors.push('E-mail ou senha incorreto(s)')
        })
    }
  },
  computed: {
    makeauth: function() {
        return {
            grant_type: 'password',
            username: this.email,
            password: this.password,
            client_id: config.client_id,
            client_secret: config.client_secret
        }
    }
  }
}
</script>

<style lang="scss">
    @import "../assets/scss/app";

    .card img{
        width: 40%;
    }

    .login-container{
        padding: 10px;
        margin-top: 10%;
    }
</style>