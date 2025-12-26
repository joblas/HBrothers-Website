
import { MenuItem } from './types';
import siteContent from './content.json';

const BASE_URL = import.meta.env.BASE_URL;

export const COLORS = {
  primary: '#182C2D',
  accent: '#DCB48D',
  background: '#FFFFFF',
  text: '#333333',
  link: '#DCB48D'
};

export const MENU_ITEMS: MenuItem[] = siteContent.menu.map(item => {
  const { imageName, ...rest } = item;
  return { ...rest, imageUrl: `${BASE_URL}images/${imageName}` } as MenuItem;
});
