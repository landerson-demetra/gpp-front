import Dashboard from '@/components/Admin/Dashboard'
import GestaoPatrimonios from '@/components/Admin/GestaoPatrimonios'
import Permissoes from '@/components/Admin/Permissoes'

export default [
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
];
