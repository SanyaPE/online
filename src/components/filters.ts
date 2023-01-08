import Card from './cards';
import baseData, { Data } from './data-base';
import { ITempObj } from './models';
import Router from './router';

class Filters {
    tempObj: ITempObj = {
        category: [],
        brand: [],
        price: [],
        stock: [],
    };
    tempDataFromFilters: Data[] = [];

    router: null | undefined;

    data: Data[];
    CATEGORY_ELEM: HTMLDivElement;
    BRAND_ELEM: HTMLDivElement;
    PRICE_ELEM: HTMLDivElement;
    STOCK_ELEM: HTMLDivElement;
    fromSlider: HTMLInputElement;
    toSlider: HTMLInputElement;
    fromInput: HTMLInputElement;
    toInput: HTMLInputElement;
    fromSliderStock: HTMLInputElement;
    toSliderStock: HTMLInputElement;
    fromInputStock: HTMLInputElement;
    toInputStock: HTMLInputElement;
    productsContainer: HTMLDivElement;
    resetBtn: HTMLButtonElement;
    foundElem: HTMLDivElement;
    sortBar: HTMLSelectElement;
    searchBar: HTMLInputElement;
    constructor(data: Data[]) {
        this.data = data;
        this.CATEGORY_ELEM = document.querySelector("[filtername='category'] .filters__list") as HTMLDivElement;
        this.BRAND_ELEM = document.querySelector("[filtername='brand'] .filters__list") as HTMLDivElement;
        this.PRICE_ELEM = document.querySelector("[filtername='category'] .filters__list") as HTMLDivElement;
        this.STOCK_ELEM = document.querySelector("[filtername='brand'] .filters__list") as HTMLDivElement;
        this.fromSlider = document.querySelector('#fromSlider') as HTMLInputElement;
        this.toSlider = document.querySelector('#toSlider') as HTMLInputElement;
        this.fromInput = document.querySelector('#fromInput') as HTMLInputElement;
        this.toInput = document.querySelector('#toInput') as HTMLInputElement;
        this.fromSliderStock = document.querySelector('#fromSliderStock') as HTMLInputElement;
        this.toSliderStock = document.querySelector('#toSliderStock') as HTMLInputElement;
        this.fromInputStock = document.querySelector('#fromInputStock') as HTMLInputElement;
        this.toInputStock = document.querySelector('#toInputStock') as HTMLInputElement;

        this.productsContainer = document.querySelector('.products__items') as HTMLDivElement;
        this.resetBtn = document.querySelector('.filters__reset-btn') as HTMLButtonElement;
        this.foundElem = document.querySelector('.stat') as HTMLDivElement;
        this.sortBar = document.getElementById('sortBar') as HTMLSelectElement;
        this.searchBar = document.querySelector('.search-bar input') as HTMLInputElement;
    }
    get tempData() {
        return this.tempDataFromFilters;
    }
    _createFilters() {
        const categoryArr = Array.from(new Set(this.data.map((item) => item.category)));
        const brandArr = Array.from(new Set(this.data.map((item) => item.brand)));
        function appendCheckboxes(data: Data[], arr: string[], elemForAppend: HTMLDivElement) {
            for (const item of arr) {
                const newCheckboxElem = document.createElement('div');
                const newInputElem = document.createElement('input');
                newInputElem.type = 'checkbox';
                newInputElem.id = item;
                const labelForInput = document.createElement('label');
                labelForInput.htmlFor = item;
                labelForInput.innerText = item;
                const qntElem = document.createElement('span');
                const quontity = data.filter((x) => (arr === categoryArr ? x.category : x.brand) === item).length;
                qntElem.innerText = ` (${quontity}/${quontity})`;
                newCheckboxElem.appendChild(newInputElem);
                newCheckboxElem.appendChild(labelForInput);
                newCheckboxElem.appendChild(qntElem);
                elemForAppend.appendChild(newCheckboxElem);
            }
        }
        appendCheckboxes(this.data, categoryArr, this.CATEGORY_ELEM);
        appendCheckboxes(this.data, brandArr, this.BRAND_ELEM);

        // ----dual-range------
        function controlFromSlider(
            fromSlider: HTMLInputElement,
            toSlider: HTMLInputElement,
            fromInput: HTMLInputElement
        ) {
            const [from, to] = getParsed(fromSlider, toSlider);
            if (from > to) {
                fromSlider.value = String(to);
                fromInput.innerText = String(to);
            } else {
                fromInput.innerText = String(from);
            }
        }

        function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
            const [from, to] = getParsed(fromSlider, toSlider);
            setToggleAccessible(toSlider);
            if (from <= to) {
                toSlider.value = String(to);
                toInput.innerText = String(to);
            } else {
                toInput.innerText = String(from);
                toSlider.value = String(from);
            }
        }

        function getParsed(currentFrom: { value: string }, currentTo: { value: string }) {
            const from = parseInt(currentFrom.value, 10);
            const to = parseInt(currentTo.value, 10);
            return [from, to];
        }

        function setToggleAccessible(currentTarget: HTMLInputElement) {
            if (Number(currentTarget.value) <= 0) {
                currentTarget.style.zIndex = '2';
            } else {
                currentTarget.style.zIndex = '0';
            }
        }

        setToggleAccessible(this.toSlider);
        setToggleAccessible(this.toSliderStock);

        this.fromSlider.oninput = () => controlFromSlider(this.fromSlider, this.toSlider, this.fromInput);
        this.toSlider.oninput = () => controlToSlider(this.fromSlider, this.toSlider, this.toInput);
        this.fromSlider.oninput = () => controlFromSlider(this.fromSlider, this.toSlider, this.fromInput);
        this.toSlider.oninput = () => controlToSlider(this.fromSlider, this.toSlider, this.toInput);

        this.fromSliderStock.oninput = () =>
            controlFromSlider(this.fromSliderStock, this.toSliderStock, this.fromInputStock);
        this.toSliderStock.oninput = () => controlToSlider(this.fromSliderStock, this.toSliderStock, this.toInputStock);
        this.fromSliderStock.oninput = () =>
            controlFromSlider(this.fromSliderStock, this.toSliderStock, this.fromInputStock);
        this.toSliderStock.oninput = () => controlToSlider(this.fromSliderStock, this.toSliderStock, this.toInputStock);

        this.foundElem.innerText = `Found: ${baseData.length}`;
    }
    _addListenersForCategory() {
        const categoryInputs: NodeListOf<HTMLInputElement> = this.CATEGORY_ELEM.querySelectorAll(
            'input[type=checkbox]'
        );
        for (let i = 0; i < categoryInputs.length; i++) {
            categoryInputs[i].addEventListener('change', (e: Event) =>
                this._categoryHandler(e.currentTarget as HTMLInputElement)
            );
        }
    }
    _categoryHandler(elem: HTMLInputElement) {
        if (elem.checked) {
            this.tempObj.category.push(elem.id);
        } else {
            this.tempObj.category.splice(this.tempObj.category.indexOf(elem.id), 1);
        }
        this._appendCardsFromTemp();
        this._disableInputBoxes();
    }
    _disableInputBoxes() {
        const brandArr = Array.from(new Set(this.tempDataFromFilters.map((item) => item.brand)));
        const categoryArr = Array.from(new Set(this.tempDataFromFilters.map((item) => item.category)));
        const categoryInputs = this.CATEGORY_ELEM.querySelectorAll(
            'input[type=checkbox]'
        ) as NodeListOf<HTMLInputElement>;
        const brandInputs = this.BRAND_ELEM.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>;

        for (let i = 0; i < categoryInputs.length; i++) {
            const element = categoryInputs[i];
            if (!categoryArr.includes(element.id)) {
                (element.labels as NodeListOf<HTMLLabelElement>)[0].classList.add('disable-filters');
            } else {
                (element.labels as NodeListOf<HTMLLabelElement>)[0].classList.remove('disable-filters');
            }
            const categoryQnt = element.nextElementSibling?.nextElementSibling as HTMLSpanElement;
            const allCategoryQnt = baseData.filter((item) => item.category === element.id).length;
            const currCategoryQnt = this.tempDataFromFilters.filter((item) => item.category === element.id).length;
            categoryQnt.innerText = ` (${currCategoryQnt}/${allCategoryQnt})`;
        }
        for (let i = 0; i < brandInputs.length; i++) {
            const element = brandInputs[i];
            if (!brandArr.includes(element.id)) {
                (element.labels as NodeListOf<HTMLLabelElement>)[0].classList.add('disable-filters');
            } else {
                (element.labels as NodeListOf<HTMLLabelElement>)[0].classList.remove('disable-filters');
            }
            const brandQnt = element.nextElementSibling?.nextElementSibling as HTMLSpanElement;
            const allBrandQnt = baseData.filter((item) => item.brand === element.id).length;
            const currBrandQnt = this.tempDataFromFilters.filter((item) => item.brand === element.id).length;
            brandQnt.innerText = ` (${currBrandQnt}/${allBrandQnt})`;
        }

        this.foundElem.innerText = `Found: ${this.tempDataFromFilters.length}`;

        // this.fromSlider.value = String(this.tempDataFromFilters.map((item) => item.price).sort((a, b) => a - b)[0])
        // this.toSlider.value = String(this.tempDataFromFilters.map((item) => item.price).sort((a, b) => a - b).at(-1))
        // this.fromInput.innerText = String(this.tempDataFromFilters.map((item) => item.price).sort((a, b) => a - b)[0])
        // this.toInput.innerText = String(this.tempDataFromFilters.map((item) => item.price).sort((a, b) => a - b).at(-1))
        // this.fromSliderStock.value = String(this.tempDataFromFilters.map((item) => item.stock).sort((a, b) => a - b)[0])
        // this.toSliderStock.value = String(this.tempDataFromFilters.map((item) => item.stock).sort((a, b) => a - b).at(-1))
        // this.fromInputStock.innerText = String(this.tempDataFromFilters.map((item) => item.stock).sort((a, b) => a - b)[0])
        // this.toInputStock.innerText = String(this.tempDataFromFilters.map((item) => item.stock).sort((a, b) => a - b).at(-1))
    }
    _resetFilters() {
        this.resetBtn.addEventListener('click', () => this._resetFiltersHandler());
    }
    _resetFiltersHandler() {
        const brandInputs: NodeListOf<HTMLInputElement> = this.BRAND_ELEM.querySelectorAll(
            'input[type=checkbox]'
        ) as NodeListOf<HTMLInputElement>;
        const categoryInputs = this.CATEGORY_ELEM.querySelectorAll(
            'input[type=checkbox]'
        ) as NodeListOf<HTMLInputElement>;
        Array.from(categoryInputs).forEach((elem) => (elem.checked = false));
        Array.from(brandInputs).forEach((elem) => (elem.checked = false));
        this.fromSlider.value = '0';
        this.toSlider.value = String(baseData.map((item) => item.price).sort((a, b) => b - a)[0]);
        this.fromSliderStock.value = '0';
        this.toSliderStock.value = String(baseData.map((item) => item.stock).sort((a, b) => b - a)[0]);
        this.fromInput.innerText = this.fromSlider.value;
        this.toInput.innerText = this.toSlider.value;
        this.fromInputStock.innerText = this.fromSliderStock.value;
        this.toInputStock.innerText = this.toSliderStock.value;
        this._resetFiltersToBase();
    }
    _resetFiltersToBase() {
        this.sortBar.selectedIndex = 0;
        Object.keys(this.tempObj).forEach((key) => {
            this.tempObj[key as keyof typeof this.tempObj] = [];
        });
        this._appendCardsFromTemp();
        this._disableInputBoxes();
        this.foundElem.innerText = `Found: ${this.tempDataFromFilters.length}`;
        console.log('filter from filter', this.tempObj);
        this.router.setRoute(this.tempObj);
    }
    _addListenersForBrands() {
        const brandInputs: NodeListOf<HTMLInputElement> = this.BRAND_ELEM.querySelectorAll('input[type=checkbox]');
        for (let i = 0; i < brandInputs.length; i++) {
            brandInputs[i].addEventListener('change', (e: Event) =>
                this._brandsHandler(e.currentTarget as HTMLInputElement)
            );
        }
    }
    _brandsHandler(elem: HTMLInputElement) {
        if (elem.checked) {
            this.tempObj.brand.push(elem.id);
        } else {
            this.tempObj.brand.splice(this.tempObj.brand.indexOf(elem.id), 1);
        }
        this._appendCardsFromTemp();
        this._disableInputBoxes();
    }
    _addListenersForPrice() {
        this.fromSlider.addEventListener('input', (e: Event) =>
            this._addListenersForPriceHandler(e.currentTarget as HTMLInputElement)
        );
        this.toSlider.addEventListener('input', (e: Event) =>
            this._addListenersForPriceHandler(e.currentTarget as HTMLInputElement)
        );
    }
    _addListenersForPriceHandler(elem: HTMLInputElement) {
        this.tempObj.price = [Number(this.fromSlider.value), Number(this.toSlider.value)];
        this._appendCardsFromTemp();
        this._disableInputBoxes();
    }
    _addListenersForStock() {
        this.fromSliderStock.addEventListener('input', (e: Event) =>
            this._addListenersForStockHandler(e.currentTarget as HTMLInputElement)
        );
        this.toSliderStock.addEventListener('input', (e: Event) =>
            this._addListenersForStockHandler(e.currentTarget as HTMLInputElement)
        );
    }
    _addListenersForStockHandler(elem: HTMLInputElement) {
        this.tempObj.stock = [Number(this.fromSliderStock.value), Number(this.toSliderStock.value)];
        this._appendCardsFromTemp();
        this._disableInputBoxes();
    }
    _appendCardsFromTemp() {
        this.productsContainer.innerHTML = '';
        this.tempDataFromFilters = baseData;

        if (Object.values(this.tempObj).every((arr) => arr.length === 0)) {
            new Card(baseData).appendCards();
            this.router.setRoute(this.tempObj);
            return;
        }
        if (this.tempObj.category.length !== 0) {
            this.tempDataFromFilters = this.tempDataFromFilters.filter((item) =>
                this.tempObj.category.some((itemId) => itemId === item.category)
            );
        }
        if (this.tempObj.brand.length !== 0) {
            this.tempDataFromFilters = this.tempDataFromFilters.filter((item) =>
                this.tempObj.brand.some((itemId) => itemId === item.brand)
            );
        }
        if (this.tempObj.price.length !== 0) {
            this.tempDataFromFilters = this.tempDataFromFilters.filter(
                (item) => item.price >= this.tempObj.price[0] && item.price <= this.tempObj.price[1]
            );
        }
        if (this.tempObj.stock.length !== 0) {
            this.tempDataFromFilters = this.tempDataFromFilters.filter(
                (item) => item.stock >= this.tempObj.stock[0] && item.stock <= this.tempObj.stock[1]
            );
        }
        if (this.tempDataFromFilters.length === 0) {
            if (Object.values(this.tempObj).some((arr) => arr.length !== 0)) {
                this.productsContainer.innerText = 'No Items found';
            } else {
                new Card(baseData).appendCards();
            }
            return;
        }
        this.foundElem.innerText = `Found: ${this.tempDataFromFilters.length}`;
        new Card(this.tempDataFromFilters).appendCards();
        this._sortProducts();

        console.log(this.tempObj);
        // new Router().setRoute(this.tempObj)
        this.router.setRoute(this.tempObj);
    }
    _sortProducts() {
        let tempData = this.tempDataFromFilters;
        if (tempData.length === 0) {
            this._appendCardsFromTemp();
            return;
        }
        this.productsContainer.innerHTML = '';
        switch (this.sortBar.selectedIndex) {
            case 1:
                tempData = tempData.sort((a, b) => a.price - b.price);
                break;
            case 2:
                tempData = tempData.sort((a, b) => b.price - a.price);
                break;
            case 3:
                tempData = tempData.sort((a, b) => a.rating - b.rating);
                break;
            case 4:
                tempData = tempData.sort((a, b) => b.rating - a.rating);
                break;
            case 5:
                tempData = tempData.sort((a, b) => a.discountPercentage - b.discountPercentage);
                break;
            case 6:
                tempData = tempData.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            default:
                break;
        }
        new Card(tempData).appendCards();
    }
    _addListenersForTopProductsBars() {
        this.sortBar.addEventListener('change', () => this._sortProducts());
        this.searchBar.addEventListener('input', (e: Event) => this._findProducts(e.currentTarget as HTMLInputElement));
    }
    _findProducts(elem: HTMLInputElement) {
        this.tempDataFromFilters = this.tempDataFromFilters.filter((item) =>
            `${item.title}${item.thumbnail}
                                                                            ${item.category}${item.brand}
                                                                            ${item.stock}${item.description}
                                                                            ${item.price}${item.discountPercentage}
                                                                            ${item.rating}`.includes(elem.value)
        );
        this._appendCardsFromTemp();
    }
    addFilters() {
        this.router = new Router();
        this._createFilters();
        this._addListenersForCategory();
        this._addListenersForBrands();
        this._addListenersForPrice();
        this._addListenersForStock();
        this._addListenersForTopProductsBars();
        this._resetFilters();
    }
    appendFromURL(tempObjFromUrl: ITempObj) {
        this.tempObj = tempObjFromUrl;
        const categoryInputs: NodeListOf<HTMLInputElement> = this.CATEGORY_ELEM.querySelectorAll(
            'input[type=checkbox]'
        );
        const brandInputs = this.BRAND_ELEM.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>;
        for (let i = 0; i < categoryInputs.length; i++) {
            const element = categoryInputs[i];
            if (this.tempObj.category.includes(element.id)) {
                element.checked = true;
            }
        }
        for (let i = 0; i < brandInputs.length; i++) {
            const element = brandInputs[i];
            if (this.tempObj.category.includes(element.id)) {
                element.checked = true;
            }
        }
        this.fromSlider.value = String(this.tempObj.price[0]);
        this.toSlider.value = String(this.tempObj.price[1]);
        this.fromSliderStock.value = String(this.tempObj.stock[0]);
        this.toSliderStock.value = String(this.tempObj.stock[1]);
        this.fromInput.innerText = this.fromSlider.value;
        this.toInput.innerText = this.toSlider.value;
        this.fromInputStock.innerText = this.fromSliderStock.value;
        this.toInputStock.innerText = this.toSliderStock.value;

        this._appendCardsFromTemp();
    }
}

export default Filters;
