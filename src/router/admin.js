import Dashboard from '@/components/Admin/Dashboard'
import Fornecedores from '@/components/Admin/Fornecedores'
import Vinculacao from '@/components/Admin/Vinculacao'
import DadosUnidade from '@/components/Admin/DadosUnidade'
import GestaoPatrimonios from '@/components/Admin/GestaoPatrimonios'
import Permissoes from '@/components/Admin/Permissoes'

export default [
    {
        path: 'fornecedores',
        component: Fornecedores,
        name: 'Fornecedores'
    },
    {
        path: 'vinculacao-pep',
        component: Vinculacao,
        name: 'Vinculacao'
    },
    {
        path: 'dados-unidade',
        component: DadosUnidade,
        name: 'DadosUnidade'
    },
    {
        path: 'gestao-patrimonios',
        component: GestaoPatrimonios,
        name: 'GestaoPatromonios'
    },
    {
        path: 'permissoes',
        component: Permissoes,
        name: 'Permissoes'
    }
]