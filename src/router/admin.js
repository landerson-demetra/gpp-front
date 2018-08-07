import Dashboard from '@/components/Admin/Dashboard'
import GestaoPatrimonios from '@/components/Admin/GestaoPatrimonios'

var routes = [
    {
        path: 'dashboard',
        component: Dashboard,
        name: 'Dashboard'
    },
    {
        path: 'gestao-patrimonios',
        component: GestaoPatrimonios,
        name: 'GestaoPatromonios'
    }
];

export default routes