import { IUrlRouters } from './models';

const urlRoutes: IUrlRouters = {
    '#404': {
        template: 'not-found',
        description: 'Page not found',
    },
    '/': {
        template: 'store',
        description: 'Store page',
    },
    '#cart': {
        template: 'cart',
        description: 'Cart page',
    },
};
export default urlRoutes;
