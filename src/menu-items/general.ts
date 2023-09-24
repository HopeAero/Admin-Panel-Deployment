import {
  IconCategory,
  IconAccessible,
  IconUsers,
  IconAugmentedReality,
  IconMailForward
} from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';

const other: MenuItem = {
  id: 'agencies-crud-category-general',
  type: MenuItemType.Group,
  title: 'General',
  children: [
    {
      id: "general-overview",
      title: "Categorias de Habilidades",
      type: MenuItemType.Collapse,
      icon: IconCategory,
      breadcrumbs: false,
      children: [
        {
          id: "list-skill-categories",
          title: "Lista de Categorias",
          type: MenuItemType.Item,
          url: "/general/skill-categories",
          breadcrumbs: false,
        },
        {
          id: "create-skill-category",
          title: "Crear Categoria",
          type: MenuItemType.Item,
          url: "/general/skill-categories/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "skills",
      title: "Habilidades",
      type: MenuItemType.Collapse,
      icon: IconAccessible,
      breadcrumbs: false,
      children: [
        {
          id: "list-skills",
          title: "Lista de Habilidades",
          type: MenuItemType.Item,
          url: "/general/skills",
          breadcrumbs: false,
        },
        {
          id: "create-skill",
          title: "Crear Habilidad",
          type: MenuItemType.Item,
          url: "/general/skills/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "users",
      title: "Usuarios",
      type: MenuItemType.Collapse,
      icon: IconUsers,
      breadcrumbs: false,
      children: [
        {
          id: "list-users",
          title: "Lista de Usuarios",
          type: MenuItemType.Item,
          url: "/general/users",
          breadcrumbs: false,
        },
        // {
        //   id: "create-user",
        //   title: "Crear Usuario",
        //   type: MenuItemType.Item,
        //   url: "/general/users/create",
        //   breadcrumbs: false,
        // },
      ],
    },
    {
      id: "publications",
      title: "Publicaciones",
      type: MenuItemType.Collapse,
      icon: IconAugmentedReality,
      breadcrumbs: false,
      children: [
        {
          id: "list-publications",
          title: "Lista de Publicaciones",
          type: MenuItemType.Item,
          url: "/general/publications",
          breadcrumbs: false,
        },
        // {
        //   id: "create-publication",
        //   title: "Crear Publicación",
        //   type: MenuItemType.Item,
        //   url: "/general/publications/create",
        //   breadcrumbs: false,
        // },
      ],
    },
    {
      id: "applications",
      title: "Postulaciones",
      type: MenuItemType.Collapse,
      icon: IconMailForward,
      breadcrumbs: false,
      children: [
        {
          id: "list-applications",
          title: "Lista de Postulaciones",
          type: MenuItemType.Item,
          url: "/general/applications",
          breadcrumbs: false,
        },
        // {
        //   id: "create-application",
        //   title: "Crear Postulación",
        //   type: MenuItemType.Item,
        //   url: "/general/applications/create",
        //   breadcrumbs: false,
        // },
      ],
    },
  ]
};
// IconAugmentedReality
export default other;
