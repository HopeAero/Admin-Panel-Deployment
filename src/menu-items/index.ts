import general from './general';
import business from './business';
import clientela from './clientela';
import { MenuItem } from './types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: MenuItem[] } = {
  items: [general, business, clientela]
};

export default menuItems;
