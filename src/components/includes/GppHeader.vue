<template>
    <div class="gpp-admin-header">
        <div class="header-details bg-primary">
            <div class="container">
                <p class="text-left">Olá, {{ profile.name }}! - Ultimo acesso (00/00 ás 00:00) | <a href="#meudadados" class="badge badge-primary text-white p-1"><i class="fas fa-user"></i> Meu dados</a> | <a href="#" data-toggle="modal" data-target="#modalIndices" class="badge badge-primary">Indíces</a> | <router-link :to="{ name: 'logout' }" title="Sair do sistema" class="badge badge-primary text-white p-1"><i class="fas fa-sign-out-alt"></i> Logout</router-link></p>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-lg">
            <div class="container">
                <router-link :to="{ name: 'GestaoPatromonios' }" title="Gestão" class="navbar-brand"><img width="100" class="img-fluid" src="../../assets/logo.png" alt="PDG"></router-link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <!-- <li class="nav-item active">
                            <router-link :to="{ name: 'painel' }" class="nav-link">Home <span class="sr-only">(current)</span></router-link>
                        </li> -->
                        <li class="nav-item active">
                            <router-link :to="{ name: 'GestaoPatromonios' }" class="nav-link"><b>Gestão</b> <span class="sr-only">(current)</span></router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdownCadastro" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cadastros</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownCadastro">
                                <router-link :to="{ name: 'Responsaveis' }" class="dropdown-item"><i class="fas fa-handshake"></i> Cadastro</router-link>
                                <router-link :to="{ name: 'Vinculacao' }" class="dropdown-item"><i class="fas fa-sync"></i> Vinculação</router-link>
                                <router-link :to="{ name: 'DadosUnidade' }" class="dropdown-item"><i class="fas fa-building"></i> Dados da Unidade</router-link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'Empreendimentos' }" class="nav-link">Empreendimentos</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'Relatorios' }" class="nav-link">Relatórios</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdownCadastro" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Importações</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownCadastro">
                                <router-link :to="{ name: 'Importacoes' }" class="dropdown-item">Ações Jurídicas</router-link>
                                <router-link :to="{ name: 'Importacoes' }" class="dropdown-item">Número do contribuinte</router-link>
                                <router-link :to="{ name: 'Importacoes' }" class="dropdown-item">Parcelas</router-link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <!-- <router-link :to="{ name: 'IRPC' }" class="nav-link">%IRPC</router-link> -->
                        </li>
                        <!-- <li class="nav-item">
                            <router-link :to="{ name: 'Permissoes' }" class="nav-link">Permissões</router-link>
                        </li> -->
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import Bus from '../../bus'
import ScaleLoader from 'vue-spinner/src/ScaleLoader'
import { mapState } from 'vuex'

export default {
    name: 'GppHeader',
    computed: mapState({ profile: state => state.user.profile })
}
</script>