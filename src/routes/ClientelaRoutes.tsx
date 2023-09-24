import { RouteObject } from 'react-router'

//Clients
import Clients from 'views/clients'
import CreateClient from 'views/clients/create'
import EditClient from 'views/clients/edit'
//Orders
import Orders from 'views/orders'
import CreateOrder from 'views/orders/create'
import EditOrder from 'views/orders/edit'
import OrderDetail from 'views/orders/detail'
//Bills
import Bills from 'views/bills'
import CreateBill from 'views/bills/create'
import EditBill from 'views/bills/edit'
import BillDetail from 'views/bills/detail'

const ClientelaRoutes: RouteObject[] = [
  {
    path: 'clientela',
    children: [
      //Clientes
      {
        path: 'clients',
        element: <Clients />
      },
      {
        path: 'clients/create',
        element: <CreateClient />
      },
      {
        path: 'clients/edit/:id',
        element: <EditClient />
      },
      //Ordenes
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'orders/create',
        element: <CreateOrder />
      },
      {
        path: 'orders/edit/:id',
        element: <EditOrder />
      },
      {
        path: 'orders/detail/:id',
        element: <OrderDetail />
      },
      //Bills
      {
        path: 'bills',
        element: <Bills />
      },
      {
        path: 'bills/create',
        element: <CreateBill />
      },
      {
        path: 'bills/edit/:id',
        element: <EditBill />
      },
      {
        path: 'bills/detail/:id',
        element: <BillDetail />
      }
    ]
  }
]

export default ClientelaRoutes
