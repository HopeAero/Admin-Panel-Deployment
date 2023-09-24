import { 
  IconUsers, 
  IconListCheck, 
  IconReceipt2,

} from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';

const other: MenuItem = {
  id: 'agencies-crud-category-clientele',
  type: MenuItemType.Group,
  title: 'Clientela',
  children: [
    {
      id: 'clients',
      title: 'Clientes',
      type: MenuItemType.Collapse,
      icon: IconUsers,
      breadcrumbs: false,
      children: [
        {
          id: 'list-clients',
          title: 'Lista de clientes',
          type: MenuItemType.Item,
          url: '/clientela/clients',
          breadcrumbs: false,
        },
        {
          id: 'create-clients',
          title: 'Crear cliente',
          type: MenuItemType.Item,
          url: '/clientela/clients/create',
          breadcrumbs: false,
        }
      ]
    },
    {
      id: 'orders',
      title: 'Ordenes',
      type: MenuItemType.Collapse,
      icon: IconListCheck,
      breadcrumbs: false,
      children: [
        {
          id: 'list-orders',
          title: 'Lista de ordenes',
          type: MenuItemType.Item,
          url: '/clientela/orders',
          breadcrumbs: false,
        },
        {
          id: 'create-orders',
          title: 'Crear orden',
          type: MenuItemType.Item,
          url: '/clientela/orders/create',
        }
      ]
    },
    {
      id: 'bills',
      title: 'Facturas',
      type: MenuItemType.Collapse,
      icon: IconReceipt2,
      url: "/bills",
      breadcrumbs: false,
      children: [
        {
          id: 'list-bills',
          title: 'Lista de facturas',
          type: MenuItemType.Item,
          url: '/clientela/bills',
          breadcrumbs: false,
        },
        {
          id: 'create-bills',
          title: 'Crear facturas',
          type: MenuItemType.Item,
          url: '/clientela/bills/create',
          breadcrumbs: false,
        }
      ]
    }
  ]
};

export default other;
