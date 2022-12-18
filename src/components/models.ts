/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
interface IApp {
    init: () => void;
}

interface IUrlRoutersItem {
    template: string;
    description: string;
}

interface IUrlRouters {
    404: IUrlRoutersItem;
    '/': IUrlRoutersItem;
    '/cart': IUrlRoutersItem;
}

interface IRouter {
    urlRoutes: IUrlRouters;
}

export { IApp, IUrlRoutersItem, IUrlRouters, IRouter };
