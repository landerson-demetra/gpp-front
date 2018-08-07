<template>
  <div id="login" class="wow fadeIn">
    <div class="gpp-header"></div>
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
export default {
  name: 'Login',
  data() {
    return {
        authenticating: false,
        errors: [],
        email: '',
        password: ''
    }
  },
  methods: {
    checkForm: function(e) {
        e.preventDefault();

        this.errors = [];

        if(this.email && this.password){
            return this.Login();
        }

        if(!this.email){
            this.errors.push('Você precisa informar um e-mail');
        }

        if(!this.password){
            this.errors.push('Você precisa informar uma senha');
        }
    },
    Login: function() {
        var self = this

        this.authenticating = true

        this.$http.post('oauth/token', this.makeauth).then((response) => {
            localStorage.setItem('gpp_token', response.data.access_token)
            self.$router.push({name: 'Dashboard'})
            self.$forceUpdate()
        }, () => {
            this.authenticating = false
            this.errors.push('E-mail ou senha incorreto(s)')
        });
    }
  },
  computed: {
    makeauth: function() {
        return {
            grant_type: 'password',
            username: this.email,
            password: this.password,
            client_id: 2,
            client_secret: 'Z5wTea348gA7xkBHXQZKhxk0FcuUMtXma8E0Oicx'
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