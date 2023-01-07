import { IUrlRouters, IFilter, CustomizedState } from './models';
import urlRoutes from './urlRoutes';
import Card from './cards';
import data from './data-base';
import Filters from './filters';
import View from './view';

//http://localhost:8081/?category=smartphones%2Claptop&brand=apple%2Csamsung

class Router {
    elements: any = {
        main: null,
    };
    urlRoutes: IUrlRouters = urlRoutes;
    href: any = null;
    hash: any = null;
    filter: IFilter = {};
    options: string[] = ['category', 'brand', 'price', 'stock'];
    public init() {
        this.elements.main = document.getElementById('main');
        this.href = window.location.href;
        this.route();
    }
    public route(e?: Event) {
        console.log('route');
        if (e) {
            console.log('EVENT');
            const target = e.target as HTMLElement;
            const hash = (target as CustomizedState).hash;
            const origin = (target as CustomizedState).origin;
            const pathname = (target as CustomizedState).pathname;
            const url = `${origin}${pathname}${hash}`;
            history.pushState({}, '', url);
            console.log(window.location.href);
            this.parseRoute();
            // } else if (filter) {
            //     console.log('FILTER', filter);
            //     console.log(window.location.href);
            //     console.log(filter);
            //     this.setRoutFromFilter(filter);
        } else {
            console.log('PARSE');
            console.log(window.location.href);
            this.parseRoute();
        }
    }
    protected parseRoute() {
        let location: string;
        const hash: string = !window.location.hash ? '/' : window.location.hash;
        const search: string = window.location.search;
        if (hash === '#cart') {
            console.log('1', !!search);
            this.loadPage(hash);
            return;
        } else if (hash === '/' && !search) {
            this.loadPage(hash);
            console.log('2', search);
            return;
        } else if (!['/', '#cart'].includes(hash)) {
            this.loadPage('#404');
            console.log('3');
            return;
        } else if (this.checkRoute()) {
            location = '/';
            this.loadPage(location);
            console.log('4', !!search);
        } else {
            location = '/';
            this.loadPage(location);
            console.log('5');
        }
    }
    public setRoutFromFilter(filter: IFilter) {
        const url = this.createUrl(filter);
        window.history.pushState({}, '', url);
    }
    protected createUrl(filter: IFilter) {
        const href = window.location.href;
        const url = new URL(href);
        for (const key in filter) {
            url.searchParams.set(`${key}`, `${filter[key as keyof typeof filter]}`);
        }
        return url;
    }
    getFilterFromRout() {
        console.log('getFilterFromRout');
    }

    protected checkRoute() {
        console.log('checkRoute');
        const filter: IFilter = {};
        const href: string = window.location.href;
        const url = new URL(href);
        const params = url.searchParams;
        this.options.forEach((option) => {
            if (params.get(option)) filter[option as keyof typeof filter] = params.get(option)?.split(',');
        });
        const newUrl = this.createUrl(filter);
        if (newUrl.href === href) {
            this.filter = filter;
            return true;
        }
        return false;
    }

    setRoute(filter: IFilter) {
        const url = this.createUrl(filter);
        window.history.pushState({}, '', url);
    }
    // createUrl(filter: IFilter) {
    //     const href = window.location.href;
    //     const url = new URL(href);
    //     for (const key in filter) {
    //         url.searchParams.set(`${key}`, `${filter[key as keyof typeof filter]}`);
    //     }
    //     return url;
    // }
    protected loadPage(hash: string) {
        const main = document.querySelector('.main') as HTMLElement | null;
        const location = !hash ? '/' : hash;
        const urlRoute = this.urlRoutes[location as keyof IUrlRouters];
        const template = document.querySelector(`#${urlRoute.template}`) as HTMLElement;
        const clone = template.content.cloneNode(true);
        main?.innerHTML = '';
        main?.appendChild(clone);
        if (location === '/') {
            const card = new Card(data);
            card.appendCards();
            const view = new View();
            view.addListeners();
            const filters = new Filters(data);
            filters.addFilters();
        }
    }
}
export default Router;
