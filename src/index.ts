import App from './components/app';
import './assets/scss/main.scss';

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
    app.init();

});
document.addEventListener('click', (e: Event) => {
    if (!(e.target as Element).closest('.nav__item')) return;
    app.router(e);
    app.cards()
});
window.addEventListener('popstate', () => {
    app.locationHandler();
});
