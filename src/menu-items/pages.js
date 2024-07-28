// assets
import { IconKey } from '@tabler/icons';
import { IconBed, IconBedFlat, IconHanger, IconSofa, IconCurrencyEuro } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconBed,
  IconBedFlat,
  IconHanger,
  IconSofa,
  IconCurrencyEuro
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Categories',
  type: 'group',
  children: [
    {
      id: 'Bed',
      title: 'UK Beds',
      type: 'item',
      url: '/pages/uk-bed',
      icon: icons.IconBed
    },
    {
      id: 'Mattress',
      title: 'UK Mattress',
      type: 'item',
      url: '/pages/companies',
      icon: icons.IconBedFlat
    },
    {
      id: 'Wardrobe',
      title: 'UK Wardrobe',
      type: 'item',
      url: '/pages/companies',
      icon: icons.IconHanger
    },
    {
      id: 'Sofas',
      title: 'UK Sofas',
      type: 'item',
      url: '/pages/companies',
      icon: icons.IconSofa
    },
    {
      id: 'Europe',
      title: 'Europe',
      type: 'item',
      url: '/pages/companies',
      icon: icons.IconCurrencyEuro
    }
  ]
};

export default pages;
