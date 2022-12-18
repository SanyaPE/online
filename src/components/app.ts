import { IApp, IUrlRoutersItem, IUrlRouters } from './models';
import urlRoutes from './urlRoutes';
import * as Temp from './temp.json';
let a = Temp;

class App implements IApp {
    urlRoutes: IUrlRouters = urlRoutes;
    elements: any = {};
    init() {
        this.elements.nav = document.querySelector('.nav');
        document.addEventListener('click', (e: Event) => {
            if (!e.target.closest('.nav__item')) return;
            this.urlRoute(e);
        });
    }
    urlRoute(event: Event) {
        console.log('urlRoute()', event);
        event = event || window.event;
        event.preventDefault();
        // window.history.pushState(state, unused, target link);
        window.history.pushState({}, '', event.target.href);
        this.urlLocationHandler();
    }
    async urlLocationHandler() {
        let location: string = window.location.pathname;
        if (location.length == 0) {
            location = '/';
        }
        console.log(location);
        const route: IUrlRoutersItem = this.urlRoutes[location] || this.urlRoutes['404'];
        console.log(route);
        const html = await fetch(route.template).then((response) => response.text());
        console.log(html);
        this.elements.main = document.getElementById('main');
        this.elements.main.innerHTML = html;
        console.log(this.elements.main);
        this.temp();
    }
    temp() {
        console.log(a[0]);
    }
}
export default App;
