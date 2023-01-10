interface IUrlRoutersItem {
    template: string;
    description: string;
}

interface IUrlRouters {
    '#404': IUrlRoutersItem;
    '/': IUrlRoutersItem;
    '#cart': IUrlRoutersItem;
}

interface IRouter {
    urlRoutes: IUrlRouters;
}

interface IFilter {
    category?: string[] | null;
    brand?: string[] | null;
    price?: string[] | null;
    stock?: string[] | null;
}

interface CustomizedState {
    hash?: string;
    target?: HTMLElement;
    href?: string;
    origin?: string;
    pathname?: string;
}
interface ITempObj {
    category: string[];
    brand: string[];
    price: string[];
    stock: string[];
}
interface ILocalStorageCartObj {
    [itemId: number]: number;
    cartOrder: number[]
}
export { IFilter, IUrlRoutersItem, IUrlRouters, IRouter, CustomizedState, ITempObj, ILocalStorageCartObj };
