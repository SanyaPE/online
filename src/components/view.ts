import data from "./data-base";
import Filters from "./filters";

class View {
    SMALL_VIEW: HTMLDivElement;
    BIG_VIEW: HTMLDivElement;
    ITEMS_LIST: HTMLDivElement;
    sortBar: HTMLSelectElement;
    constructor() {
        this.SMALL_VIEW = document.querySelector('.view-mode__small') as HTMLDivElement;
        this.BIG_VIEW = document.querySelector('.view-mode__big') as HTMLDivElement;
        this.ITEMS_LIST = document.querySelector('.products__items') as HTMLDivElement;
        this.sortBar = document.getElementById('sortBar') as HTMLSelectElement
    }
    _toSmallView() {
        this.ITEMS_LIST.classList.add('_resize-products');
    }
    _toBigView() {
        this.ITEMS_LIST.classList.remove('_resize-products');
    }
    _sortProducts() {
        switch (this.sortBar.selectedIndex) {
            case 1:
                let filters = new Filters(data)
                filters.tempDataFromFilters
                break;

            default:
                break;
        }

    }
    addListeners() {
        this.SMALL_VIEW.addEventListener('click', () => this._toSmallView());
        this.BIG_VIEW.addEventListener('click', () => this._toBigView());
        this.sortBar.addEventListener('change', () => this._sortProducts())
    }
}

export default View;
