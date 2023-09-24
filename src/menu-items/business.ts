// assets
import {
  IconUser,
  IconShoppingCart,
  IconPackage,
} from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";

const business: MenuItem = {
  id: "business-crud-category",
  type: MenuItemType.Group,
  title: "Negocio",
  children: [
    {
      id: "admins",
      title: "Administradores",
      type: MenuItemType.Collapse,
      icon: IconUser,
      breadcrumbs: false,
      children: [
        {
          id: "list-admin",
          title: "Lista de Administradores",
          type: MenuItemType.Item,
          url: "/business/admins",
          breadcrumbs: false,
        },
        {
          id: "create-admin",
          title: "Crear Administrador",
          type: MenuItemType.Item,
          url: "/business/admins/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "purchases",
      title: "Compras",
      type: MenuItemType.Collapse,
      icon: IconShoppingCart,
      breadcrumbs: false,
      children: [
        {
          id: "list-purchases",
          title: "Lista de Compras",
          type: MenuItemType.Item,
          url: "/business/purchases",
          breadcrumbs: false,
        },
        {
          id: "create-purchase",
          title: "Crear una Compra",
          type: MenuItemType.Item,
          url: "/business/purchases/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "products",
      title: "Inventario",
      type: MenuItemType.Collapse,
      icon: IconPackage,
      breadcrumbs: false,
      children: [
        {
          id: "list-products",
          title: "Lista de Productos",
          type: MenuItemType.Item,
          url: "/business/products",
          breadcrumbs: false,
        },
        {
          id: "create-product",
          title: "Crear un producto",
          type: MenuItemType.Item,
          url: "/business/products/create",
          breadcrumbs: false,
        },
        {
          id: "stats-products",
          title: "Estadísticas",
          type: MenuItemType.Item,
          url: "/business/products/create",
          breadcrumbs: false,
        },
      ],
    }
  ]
};

export default business;
