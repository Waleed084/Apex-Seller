import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/SleighBed')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Devan')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Mattress')));
const UkBed = Loadable(lazy(() => import('views/pages/categories/UkBed')));
const Companies = Loadable(lazy(() => import('views/pages/companies/Companies')));
const OrderDetails = Loadable(lazy(() => import('views/pages/order-details/OrderDetails')));
const Cart = Loadable(lazy(() => import('views/pages/cart/Cart')));
const CartOrderDetail = Loadable(lazy(() => import('views/pages/cart/CartOrderDetail')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
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
      path: 'utils',
      children: [
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'cart/:id',
          element: <CartOrderDetail />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'pages',
      children: [
        {
          path: 'uk-bed',
          element: <UkBed />
        },
        {
          path: 'companies/:type',
          element: <Companies />
        },
        {
          path: 'properties/:type/:company',
          element: <OrderDetails />
        }
      ]
    }
  ]
};

export default MainRoutes;
