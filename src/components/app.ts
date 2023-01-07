import Router from './router';
// import Card from './cards';
// import data from './data-base';
// import Filters from './filters';
// import urlRoutes from './urlRoutes';
// import View from './view';

class App {
    router: any;
    filter: any;
    init() {
        this.router = new Router();
        this.router.init();
        document.addEventListener('click', (e: Event) => {
            const target = e.target as Element;
            console.log(target.closest('.link'));
            e.preventDefault();
            if (!(e.target as Element).closest('.nav__link')) return;
            this.router.route(e);
        });
        window.addEventListener('popstate', () => {
            console.log('popstate');
            this.router.route();
        });
    }
    // _cards() {
    //     const card = new Card(data);
    //     card.appendCards();
    // }
    // _view() {
    //     const view = new View();
    //     view.addListeners();
    // }
    // _filters() {
    //     const filters = new Filters(data);
    //     filters.addFilters();
    // }
}
export default App;
