import App from './components/app';
import './assets/scss/main.scss';

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
console.log('hello')
