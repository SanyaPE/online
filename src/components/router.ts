import { IUrlRouters, IFilter, CustomizedState } from './models';
import urlRoutes from './urlRoutes';
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
        this.parseRoute();
    }
    public route(e?: Event, filter?: IFilter) {
        console.log('route');
        if (e) {
            const target = e.target;
            const url = (target as CustomizedState).href;
            history.pushState({}, '', url);
            this.parseRoute();
        } else if (filter) {
            console.log('filter');
            this.setRoutFromFilter(filter);
        } else {
            this.parseRoute();
        }
    }
    protected parseRoute() {
        // let location: string = window.location.hash;
        const hash: string = !window.location.hash ? '/' : window.location.hash;
        const search: string = window.location.search;
        if (hash === '#cart') {
            console.log('1');
            this.loadPage(hash);
            return;
        } else if (hash === '/' && !search) {
            this.loadPage(hash);
            console.log('2');
            return;
        } else if (!['/', '#cart'].includes(hash)) {
            this.loadPage('#404');
            console.log('3');
            return;
            // todo Начать с этой точки
        } else if (this.checkRoute()) {
            location = '/';
            this.loadPage(location);
            console.log('4');
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
            localStorage.setItem('filter', JSON.stringify(filter));
            return true;
        }
        return false;
    }

    // setRoute(filter: IFilter) {
    //     const url = this.createUrl(filter);
    //     window.history.pushState({}, '', url);
    // }
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
        const template = document.querySelector(`#${urlRoute.template}`) as HTMLElement | null;
        const clone = template.content.cloneNode(true);
        main?.innerHTML = '';
        main?.appendChild(clone);
    }
}
export default Router;
