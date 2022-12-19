import { IUrlRouters } from './models';

const urlRoutes: IUrlRouters = {
    '404': {
        template: '/templates/404.html',
        description: 'Page not found',
    },
    '/': {
        template: '/templates/store.html',
        description: 'Online-store page',
    },
    cart: {
        template: '/templates/cart.html',
        description: 'Cart page',
    },
};
export default urlRoutes;
