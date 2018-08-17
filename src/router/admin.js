import Dashboard from '@/components/Admin/Dashboard'
import Fornecedores from '@/components/Admin/Fornecedores'
import Vinculacao from '@/components/Admin/Vinculacao'
import DadosUnidade from '@/components/Admin/DadosUnidade'
import GestaoPatrimonios from '@/components/Admin/GestaoPatrimonios'
import Empreendimentos from '@/components/Admin/Empreendimentos'
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