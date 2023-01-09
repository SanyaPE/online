import { IUrlRouters, IFilter, CustomizedState, ITempObj } from './models';
import urlRoutes from './urlRoutes';
import Card from './cards';
import data from './data-base';
import Filters from './filters';
import View from './view';
import cartStorage from './cart-storage';
import Cart from './cart';

class Router {
    elements: any = {
        main: null,
    };
    urlRoutes: IUrlRouters = urlRoutes;
    href: any = null;
    hash: any = null;
    options: string[] = ['category', 'brand', 'price', 'stock'];
    filter: IFilter = {};
    public init() {
        this.elements.main = document.getElementById('main');
        this.href = window.location.href;
        this.route();
    }
    public route(e?: Event) {
        if (e) {
            const target = e.target as HTMLElement;
            const hash = (target as CustomizedState).hash;
            const origin = (target as CustomizedState).origin;
            const pathname = (target as CustomizedState).pathname;
            const url = `${origin}${pathname}${hash}`;
            history.pushState({}, '', url);
            this.parseRoute();
        } else {
            this.parseRoute();
        }
    }
    protected parseRoute() {
        let location: string;
        const hash: string = !window.location.hash ? '/' : window.location.hash;
        const search: string = window.location.search;
        // check storage for cart
        new cartStorage().checkStorage()

        if (hash === '#cart') {
            console.log('1');
            this.loadPage(hash);
            new Cart().appendProductsFromCart()
            return;
        } else if (hash === '/' && !search) {
            this.loadPage(hash);
            console.log('2');
            return;
        } else if (!['/', '#cart'].includes(hash)) {
            this.loadPage('#404');
            console.log('3');
            return;
        } else if (this.checkRoute()) {
            location = '/';
            console.log('4');
            this.loadPage(location);
            const card = new Card(data);
            card.appendCards();
            const view = new View();
            view.addListeners();
            const filters = new Filters();
            // filters.addFilters();
            filters.appendFromURL(this.filter as ITempObj);
        } else {
            location = '/';
            this.loadPage(location);
            console.log('5');
        }
    }

    setRoute(filter: IFilter) {
        const url = this.createUrl(filter);
        window.history.pushState({}, '', url);
    }

    protected createUrl(filter: IFilter) {
        const href = window.location.href;
        const url = new URL(href);
        for (const key in filter) {
            const item: string[] | null | undefined = filter[key as keyof typeof filter];
            if ((item as string[]).length > 0) {
                url.searchParams.set(`${key}`, `${filter[key as keyof typeof filter]}`);
            } else url.searchParams.delete(key);
        }
        return url;
    }
    protected checkRoute() {
        const filter: IFilter = {};
        const href: string = window.location.href;
        const url = new URL(href);
        const params = url.searchParams;
        this.options.forEach((option) => {
            if (params.get(option)) filter[option as keyof typeof filter] = params.get(option)?.split(',');
            else filter[option as keyof typeof filter] = [];
        });
        this.filter = filter;
        console.log('filter to filters.ts', this.filter);
        return this.checkDataFilter();
    }
    protected checkDataFilter() {
        const isFilter = true;
        return isFilter;
    }

    protected loadPage(hash: string) {
        const main = document.querySelector('.main') as HTMLElement | null;
        const location = !hash ? '/' : hash;
        const urlRoute = this.urlRoutes[location as keyof IUrlRouters];
        const template = document.querySelector(`#${urlRoute.template}`) as HTMLTemplateElement;
        const clone = template.content.cloneNode(true);
        if (main !== null) {
            main.innerHTML = '';
            main.appendChild(clone);
        }
        if (location === '/') {
            const card = new Card(data);
            card.appendCards();
            const view = new View();
            view.addListeners();
            const filters = new Filters();
            filters.addFilters();
        }
    }
}
export default Router;
