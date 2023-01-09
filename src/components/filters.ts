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
    router: Router;
    constructor() {
        this.router = new Router();
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
    _createFilters() {
        const categoryArr = Array.from(new Set(baseData.map((item) => item.category)));
        const brandArr = Array.from(new Set(baseData.map((item) => item.brand)));
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
        appendCheckboxes(baseData, categoryArr, this.CATEGORY_ELEM);
        appendCheckboxes(baseData, brandArr, this.BRAND_ELEM);

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
        this.tempObj.price = [this.fromSlider.value, this.toSlider.value];
        this._appendCardsFromTemp();

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
        this.tempObj.stock = [this.fromSliderStock.value, this.toSliderStock.value];
        this._appendCardsFromTemp();
    }
    _appendCardsFromTemp() {
        // console.log('from func append', this.tempObj);

        this.productsContainer.innerHTML = '';
        this.tempDataFromFilters = baseData;

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
                (item) => Number(item.price) >= Number(this.tempObj.price[0]) && Number(item.price) <= Number(this.tempObj.price[1])
            );
        }
        if (this.tempObj.stock.length !== 0) {
            this.tempDataFromFilters = this.tempDataFromFilters.filter(
                (item) => Number(item.stock) >= Number(this.tempObj.stock[0]) && Number(item.stock) <= Number(this.tempObj.stock[1])
            );
        }
        this.foundElem.innerText = `Found: ${this.tempDataFromFilters.length}`;
        if (this.tempDataFromFilters.length === 0 && Object.values(this.tempObj).some((arr) => arr.length !== 0)) {
            this.productsContainer.innerText = 'No Items found';
        } else {
            new Card(this.tempDataFromFilters).appendCards();
            this._sortProducts();
        }
        this._disableInputBoxes();
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
        this._findProducts(this.searchBar.value)
    }
    _addListenersForTopProductsBars() {
        this.sortBar.addEventListener('change', () => this._sortProducts());
        this.searchBar.addEventListener('input', (e: Event) => this._findProducts((e.target as HTMLInputElement).value as string))
    }
    _findProducts(value: string) {
        this.productsContainer.innerHTML = ''
        let tempData = this.tempDataFromFilters.length ? this.tempDataFromFilters : baseData
        tempData = tempData.filter((item) => Object.values(item).map((prop) => String(prop))
            .join('').replace(/\s/g, '').toLowerCase()
            .includes(String(value).replace(/\s/g, '').toLowerCase()))
        if (tempData.length) {
            new Card(tempData).appendCards()
            this.foundElem.innerText = `Found: ${tempData.length}`;
            return
        }
        this.productsContainer.innerText = 'No items found'
    }
    addFilters() {
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
        // console.log('filter from router.ts', this.tempObj);

        const categoryInputs = this.CATEGORY_ELEM.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>;
        const brandInputs = this.BRAND_ELEM.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>;
        this.fromSlider.value = String(this.tempObj.price[0] ? this.tempObj.price[0] : 0);
        this.toSlider.value = String(this.tempObj.price[1] ? this.tempObj.price[1] : 1749);
        this.fromSliderStock.value = String(this.tempObj.stock[0] ? this.tempObj.stock[0] : 0);
        this.toSliderStock.value = String(this.tempObj.stock[1] ? this.tempObj.stock[1] : 150);
        this.fromInput.innerText = this.fromSlider.value;
        this.toInput.innerText = this.toSlider.value;
        this.fromInputStock.innerText = this.fromSliderStock.value;
        this.toInputStock.innerText = this.toSliderStock.value;

        for (let i = 0; i < categoryInputs.length; i++) {
            const element = categoryInputs[i];
            if (this.tempObj.category.includes(element.id)) {
                //     element.checked = true;
                // } else {
                //     element.checked = false;
                element.click()
            }
        }
        for (let i = 0; i < brandInputs.length; i++) {
            const element = brandInputs[i];
            if (this.tempObj.brand.includes(element.id)) {
                //     element.checked = true;
                // } else {
                //     element.checked = false
                element.click()
            }
        }
        this._appendCardsFromTemp();

    }
}

export default Filters;
