import Dashboard from '@/components/Admin/Dashboard'
import Responsaveis from '@/components/Admin/Responsaveis'
import Vinculacao from '@/components/Admin/Vinculacao'
import DadosUnidade from '@/components/Admin/DadosUnidade'
import GestaoPatrimonios from '@/components/Admin/GestaoPatrimonios'
import Empreendimentos from '@/components/Admin/Empreendimentos'
import Permissoes from '@/components/Admin/Permissoes'

import Testes from '@/components/Admin/Testes'

export default [
    {
        path: 'testes',
        component: Testes,
        name: 'Testes'
    },
    {
        path: 'responsaveis',
        component: Responsaveis,
        name: 'Responsaveis'
    },
    {
        path: 'vinculacao/:projeto?',
        component: Vinculacao,
        name: 'Vinculacao'
    },
    {
        path: 'dados-unidade/:pep?',
        component: DadosUnidade,
        name: 'DadosUnidade'
    },
    {
        path: 'gestao-patrimonios/:pep?',
        component: GestaoPatrimonios,
        name: 'GestaoPatromonios'
    },
    {
        path: 'empreendimentos',
        component: Empreendimentos,
        name: 'Empreendimentos'
    },
    {
        path: 'permissoes',
        component: Permissoes,
        name: 'Permissoes'
    }
]