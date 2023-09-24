import { RouteObject } from 'react-router'

// Admins
import Admins from 'views/admins'
import CreateAdmin from 'views/admins/create'
import EditAdmin from 'views/admins/edit'
// Products
import Products from 'views/products'
import CreateProduct from 'views/products/create'
import EditProduct from 'views/products/edit'
// Purchases
import Purchases from 'views/purchases'
// import CreateProduct from 'views/products/create'
// import EditProduct from 'views/products/edit'
// Service
import Services from 'views/services'
import CreateService from 'views/services/create'
import EditService from 'views/services/edit'

const BusinessRoutes: RouteObject[] = [
  {
    path: 'business',
    children: [
      // Admins
      {
        path: 'admins',
        element: <Admins />
      },
      {
        path: 'admins/create',
        element: <CreateAdmin />
      },
      {
        path: 'admins/edit/:id',
        element: <EditAdmin />
      },
      // Purchases
      {
        path: 'purchases',
        element: <Purchases />
      },
      {
        path: 'purchases/create'
      },
      {
        path: 'purchases/edit/:id'
      },
      // Inventory
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'products/create',
        element: <CreateProduct />
      },
      {
        path: 'products/edit/:id',
        element: <EditProduct />
      }
    ]
  },
  {
    path: 'services',
    element: <Services />
  },
  {
    path: 'services/create',
    element: <CreateService />
  },
  {
    path: 'services/edit/:id',
    element: <EditService />
  }
]

export default BusinessRoutes
