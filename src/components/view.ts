class View {
    SMALL_VIEW: HTMLDivElement;
    BIG_VIEW: HTMLDivElement;
    ITEMS_LIST: HTMLDivElement;
    constructor() {
        this.SMALL_VIEW = document.querySelector('.view-mode__small') as HTMLDivElement;
        this.BIG_VIEW = document.querySelector('.view-mode__big') as HTMLDivElement;
        this.ITEMS_LIST = document.querySelector('.products__items') as HTMLDivElement;
    }
    _toSmallView() {
        this.ITEMS_LIST.classList.add('_resize-products');
    }
    _toBigView() {
        this.ITEMS_LIST.classList.remove('_resize-products');
    }
    addListeners() {
        this.SMALL_VIEW.addEventListener('click', () => this._toSmallView());
        this.BIG_VIEW.addEventListener('click', () => this._toBigView());
    }
}

export default View;
