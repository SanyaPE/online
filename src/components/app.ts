import Router from './router';

class App {
    router: any;
    filter: any;
    init() {
        this.router = new Router();
        this.router.init();
        document.addEventListener('click', (e: Event) => {
            if (!(e.target as Element).closest('.nav__link')) return;
            this.router.route(e);
        });
        window.addEventListener('popstate', () => {
            console.log('popstate');
            this.router.route();
        });
    }
}
export default App;
