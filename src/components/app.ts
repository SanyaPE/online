import { IApp, IUrlRoutersItem, IUrlRouters } from './models';
import urlRoutes from './urlRoutes';

class App implements IApp {
    urlRoutes: IUrlRouters = urlRoutes;
    elements: any = {};
    init() {
        this.locationHandler();
        this.elements.nav = document.querySelector('.nav');
    }
    router(event: Event) {
        event.preventDefault();
        history.pushState({}, '', event.target.href);
        this.locationHandler();
    }
    async locationHandler() {
        let location: string = window.location.hash.replace('#', '');
        if (location.length == 0) {
            location = '/';
        }
        const route: IUrlRoutersItem = this.urlRoutes[location as keyof IUrlRouters] || this.urlRoutes['404'];
        const html = await fetch(route.template).then((response) => response.text());
        this.elements.main = document.getElementById('main');
        this.elements.main.innerHTML = html;
    }
}
export default App;
