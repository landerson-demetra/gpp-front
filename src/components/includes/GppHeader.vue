<template>
    <div class="gpp-admin-header">
        <div class="header-details bg-primary">
            <div class="container">
                <p class="text-left">Olá, {{ profile.name }}! - Ultimo acesso (01/08 ás 15:50) | <a href="#meudadados" class="badge badge-primary text-white p-1"><i class="fas fa-user"></i> Meu dados</a> | <router-link :to="{ name: 'logout' }" title="Sair do sistema" class="badge badge-primary text-white p-1"><i class="fas fa-sign-out-alt"></i> Logout</router-link></p>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-lg">
            <div class="container">
                <router-link :to="{ name: 'painel' }" title="Home" class="navbar-brand"><img width="100" class="img-fluid" src="../../assets/logo.png" alt="PDG"></router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <router-link :to="{ name: 'painel' }" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'GestaoPatromonios' }" class="nav-link">Gestão de Patrimônios</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdownCadastro" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownCadastro">
                                <router-link :to="{ name: 'Responsaveis' }" class="dropdown-item"><i class="fas fa-handshake"></i> Cadastro</router-link>
                                <router-link :to="{ name: 'Vinculacao' }" class="dropdown-item"><i class="fas fa-sync"></i> Vinculação</router-link>
                                <router-link :to="{ name: 'DadosUnidade' }" class="dropdown-item"><i class="fas fa-building"></i> Dados da Unidade</router-link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Importações
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#"><i class="fas fa-file-excel"></i> Importar Excel</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'Empreendimentos' }" class="nav-link">Empreendimentos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'Permissoes' }" class="nav-link">Permissões</router-link>
                        </li>
                    </ul>
                    <!-- <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> -->
                </div>
          </div>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'GppHeader',
    computed: mapState({ profile: state => state.user.profile })
}
</script>