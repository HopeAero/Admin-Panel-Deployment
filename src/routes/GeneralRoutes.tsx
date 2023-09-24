import { RouteObject } from 'react-router'

//
import GeneralBalance from 'views/general-balance'
// Wallets
import Wallets from 'views/wallets'
import CreateWallet from 'views/wallets/create'
import EditWallet from 'views/wallets/edit'
// import DetailWallet from 'views/wallets/detail'
// Movements
import Movements from 'views/movements'
import CreateMovement from 'views/movements/create'
import EditMovement from 'views/movements/edit'
// Swaps
import Swaps from 'views/swaps'
import CreateSwap from 'views/swaps/create'
import EditSwap from 'views/swaps/edit'
// State
import States from 'views/states'
import CreateState from 'views/states/create'
import EditState from 'views/states/edit'
// City
import Cities from 'views/cities'
import CreateCity from 'views/cities/create'
import EditCity from 'views/cities/edit'
// Agency
import Agencies from 'views/agencies'
import CreateAgency from 'views/agencies/create'
import EditAgency from 'views/agencies/edit'
import DetailAgency from 'views/agencies/detail'
//Models
import Models from 'views/models'
import CreateModel from 'views/models/create'
import EditModel from 'views/models/edit'
import DetailModel from 'views/models/detail'
//Job
import Jobs from 'views/jobs'
import CreateJob from 'views/jobs/create'
import EditJob from 'views/jobs/edit'
//Managers
import Managers from 'views/managers'
import CreateManager from 'views/managers/create'
import EditManager from 'views/managers/edit'
//Employees
import Employees from 'views/employees'
import CreateEmployee from 'views/employees/create'
import EditEmployee from 'views/employees/edit'
//Reservas
import Bookings from 'views/bookings'
import CreateBooking from 'views/bookings/create'
import EditBooking from 'views/bookings/edit'
//Coordinadores
import Coordinators from 'views/coordinators'
//Stocks / Inventarios
import Stocks from 'views/stocks'
//BankCards
import BankCards from 'views/bankCards'
import CreateBankCard from 'views/bankCards/create'
import EditBankCard from 'views/bankCards/edit'
//Payments
import Payments from 'views/payments'
import CreatePayments from 'views/payments/create'
import EditPayments from 'views/payments/edit'
//Supply Lines
import SupplyLines from 'views/supply-lines'
import CreateSupplyLine from 'views/supply-lines/create'
import EditSupplyLine from 'views/supply-lines/edit'
//Discounts
import Discounts from 'views/discounts'
import CreateDiscount from 'views/discounts/create'
import EditDiscount from 'views/discounts/edit'
//Vehicles
import Vehicles from 'views/vehicles'
import CreateVehicle from 'views/vehicles/create'
import EditVehicle from 'views/vehicles/edit'
//Stadistics
import NoEcoProducts from 'views/stadistics/no-eco-products'
import FakeClients from 'views/stadistics/fake-clients'
import BestSellingProducts from 'views/stadistics/best-selling-products'
import FrecuentModelsByService from 'views/stadistics/frecuent-models-by-service'
import AgencyEarnings from 'views/stadistics/agency-earnings'
import EmployeesQuantityServicesPerMonth from 'views/stadistics/employees-quantity-services-per-month'
import FrecuentModelsByDate from 'views/stadistics/frecuent-models-by-date'
// Skill Categories
import SkillCategories from 'views/skill-categories'
import CreateSkillCategory from 'views/skill-categories/create'
import EditSkillCategory from 'views/skill-categories/edit'

// Skills
import Skills from 'views/skills'
import CreateSkill from 'views/skills/create'
import EditSkill from 'views/skills/edit'

// Users
import Users from 'views/users'

// Publications
import Publications from 'views/publications'

// Publications
import Applications from 'views/applications'

const GeneralRoutes: RouteObject[] = [
  {
    path: 'general',
    children: [
      // Skill Categories
      {
        path: 'skill-categories',
        element: <SkillCategories />
      },
      {
        path: 'skill-categories/create',
        element: <CreateSkillCategory />
      },
      {
        path: 'skill-categories/edit/:id',
        element: <EditSkillCategory />
      },
      // Skills
      {
        path: 'skills',
        element: <Skills />
      },
      {
        path: 'skills/create',
        element: <CreateSkill />
      },
      {
        path: 'skills/edit/:id',
        element: <EditSkill />
      },
      // Users
      {
        path: 'users',
        element: <Users />
      },
      // Publications
      {
        path: 'publications',
        element: <Publications />
      },
      // Publications
      {
        path: 'applications',
        element: <Applications />
      },
      // General Balance
      {
        path: 'balance',
        element: <GeneralBalance />
      },
      // Wallets
      {
        path: 'wallets',
        element: <Wallets />
      },
      {
        path: 'wallets/create',
        element: <CreateWallet />
      },
      {
        path: 'wallets/edit/:id',
        element: <EditWallet />
      },
      {
        path: 'wallets/detail/:id'
        // element: <DetailWallet />
      },
      // Movements
      {
        path: 'movements',
        element: <Movements />
      },
      {
        path: 'movements/create',
        element: <CreateMovement />
      },
      {
        path: 'movements/edit/:id',
        element: <EditMovement />
      },
      // Swaps
      {
        path: 'swaps',
        element: <Swaps />
      },
      {
        path: 'swaps/create',
        element: <CreateSwap />
      },
      {
        path: 'swaps/edit/:id',
        element: <EditSwap />
      }
    ]
  },
  // Estados
  {
    path: 'states',
    element: <States />
  },
  {
    path: 'states/create',
    element: <CreateState />
  },
  {
    path: 'states/edit/:id',
    element: <EditState />
  },
  // Ciudades
  {
    path: 'cities',
    element: <Cities />
  },
  {
    path: 'cities/create',
    element: <CreateCity />
  },
  {
    path: 'cities/edit/:id',
    element: <EditCity />
  },
  // Agencias
  {
    path: 'agencies',
    element: <Agencies />
  },
  {
    path: 'agencies/create',
    element: <CreateAgency />
  },
  {
    path: 'agencies/edit/:id',
    element: <EditAgency />
  },
  {
    path: 'agencies/detail/:id',
    element: <DetailAgency />
  },
  // Modelos
  {
    path: 'models',
    element: <Models />
  },
  {
    path: 'models/create',
    element: <CreateModel />
  },
  {
    path: 'models/edit/:id',
    element: <EditModel />
  },
  {
    path: 'models/detail/:id',
    element: <DetailModel />
  },
  //Cargos
  {
    path: 'jobs',
    element: <Jobs />
  },
  {
    path: 'jobs/create',
    element: <CreateJob />
  },
  {
    path: 'jobs/edit/:id',
    element: <EditJob />
  },
  //Encargados
  {
    path: 'managers',
    element: <Managers />
  },
  {
    path: 'managers/create',
    element: <CreateManager />
  },
  {
    path: 'managers/edit/:id',
    element: <EditManager />
  },
  //Empleados
  {
    path: 'employees',
    element: <Employees />
  },
  {
    path: 'employees/create',
    element: <CreateEmployee />
  },
  {
    path: 'employees/edit/:id',
    element: <EditEmployee />
  },
  //Reservas
  {
    path: 'Bookings',
    element: <Bookings />
  },
  {
    path: 'Bookings/create',
    element: <CreateBooking />
  },
  {
    path: 'Bookings/edit/:id',
    element: <EditBooking />
  },
  //Coordinadores
  {
    path: 'coordinators',
    element: <Coordinators />
  },
  //Inventario
  {
    path: 'inventory',
    element: <Stocks />
  },
  //Tarjeta
  {
    path: 'bankCards',
    element: <BankCards />
  },
  {
    path: 'bankCards/create',
    element: <CreateBankCard />
  },
  {
    path: 'bankCards/edit/:id',
    element: <EditBankCard />
  },
  //Pagos
  {
    path: 'payments',
    element: <Payments />
  },
  {
    path: 'payments/create',
    element: <CreatePayments />
  },
  {
    path: 'payments/edit/billId/:billId/payment/:paymentId',
    element: <EditPayments />
  },
  //Supply Lines
  {
    path: 'supply-lines',
    element: <SupplyLines />
  },
  {
    path: 'supply-lines/create',
    element: <CreateSupplyLine />
  },
  {
    path: 'supply-lines/edit/:id',
    element: <EditSupplyLine />
  },
  //Discounts
  {
    path: 'discounts',
    element: <Discounts />
  },
  {
    path: 'discounts/create',
    element: <CreateDiscount />
  },
  {
    path: 'discounts/edit/:id',
    element: <EditDiscount />
  },
  //Vehículos
  {
    path: 'vehicles',
    element: <Vehicles />
  },
  {
    path: 'vehicles/create',
    element: <CreateVehicle />
  },
  {
    path: 'vehicles/edit/:id',
    element: <EditVehicle />
  },
  //Stadistics
  {
    path: 'eco-products',
    element: <NoEcoProducts />
  },
  {
    path: 'fake-clients',
    element: <FakeClients />
  },
  {
    path: 'best-selling-products',
    element: <BestSellingProducts />
  },
  {
    path: 'frecuent-models-by-service',
    element: <FrecuentModelsByService />
  },
  {
    path: 'agency-earnings',
    element: <AgencyEarnings />
  },
  {
    path: 'employees-eficency',
    element: <EmployeesQuantityServicesPerMonth />
  },
  {
    path: 'models-date-attendant',
    element: <FrecuentModelsByDate />
  }
]

export default GeneralRoutes
