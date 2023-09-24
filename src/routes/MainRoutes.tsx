import { lazy } from 'react'

// project imports
import MainLayout from 'layout/MainLayout'
import Loadable from 'components/Loadable'
import { RouteObject } from 'react-router'

// pages
import Logout from 'views/logout'
import GeneralRoutes from './GeneralRoutes'
import BusinessRoutes from './BusinessRoutes'
import ClientelaRoutes from './ClientelaRoutes'

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')))
const SamplePage = Loadable(lazy(() => import('views/sample-page')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    ...GeneralRoutes,
    ...BusinessRoutes,
    ...ClientelaRoutes,
    {
      path: 'logout',
      element: <Logout />
    }
  ]
}

export default MainRoutes
