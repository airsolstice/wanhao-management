import Loadable from 'react-loadable';
import PageLoading from 'components/pageLoading/index';

const loadComponent = (loader,loading = PageLoading) =>{
    return Loadable({
        loader,
        loading
    })
}
//子路由
// const ShowSubOne = loadComponent( () => import('views/workbook/one/index.js'))
// const ShowSubTwo= loadComponent( () => import('views/workbook/two/index.js'))

const Hotel = loadComponent( () => import('views/info/hotel'))
const Employee = loadComponent( () => import('views/info/employee'))
const Thing = loadComponent( () => import('views/info/thing'))

const Charge = loadComponent(() => import('views/workbook/charge'))
const Order = loadComponent(() => import('views/workbook/order'))
export default{
    // ShowSubOne,
    Employee,
    Hotel,
    Thing,
    Charge,
    Order
}