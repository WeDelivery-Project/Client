// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Pickups',
    path: '/dashboard/ramassage',
    icon: icon('ic_pickup'),
  },
  {
    title: 'Shipments',
    path: '/dashboard/envoi',
    icon: icon('ic_shipment'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Tarif des Wilayas',
    path: '/dashboard/wilaya',
    icon: icon('ic_lock'),
  },
  {
    title: 'Parameters',
    path: '/dashboard/parameter',
    icon: icon('ic_parameter'),
    role: 'parameters',
  },
];

export default navConfig;
