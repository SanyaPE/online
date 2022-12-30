import Card from './cards';
import data from './data-base';
import baseData, { Data } from './data-base'
interface ITempObj {
    category: string[];
    brand: string[];
    price: number[];
    stock: number[];
}
class Filters {
    tempObj: ITempObj = {
        category: [],
        brand: [],
        price: [],
        stock: [],
    }
    tempDataFromFilters: Data[] = []

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
    constructor(data: Data[]) {
        this.data = data;
        this.CATEGORY_ELEM = document.querySelector("[filtername='category'] .filters__list") as HTMLDivElement
        this.BRAND_ELEM = document.querySelector("[filtername='brand'] .filters__list") as HTMLDivElement
        this.PRICE_ELEM = document.querySelector("[filtername='category'] .filters__list") as HTMLDivElement
        this.STOCK_ELEM = document.querySelector("[filtername='brand'] .filters__list") as HTMLDivElement
        this.fromSlider = document.querySelector('#fromSlider') as HTMLInputElement;
        this.toSlider = document.querySelector('#toSlider') as HTMLInputElement;
        this.fromInput = document.querySelector('#fromInput') as HTMLInputElement;
        this.toInput = document.querySelector('#toInput') as HTMLInputElement;
        this.fromSliderStock = document.querySelector('#fromSliderStock') as HTMLInputElement;
        this.toSliderStock = document.querySelector('#toSliderStock') as HTMLInputElement;
        this.fromInputStock = document.querySelector('#fromInputStock') as HTMLInputElement;
        this.toInputStock = document.querySelector('#toInputStock') as HTMLInputElement;

        this.productsContainer = document.querySelector('.products__items') as HTMLDivElement
    }
    _createFilters() {
        let categoryArr = Array.from(new Set(this.data.map((item) => item.category)));
        let brandArr = Array.from(new Set(this.data.map((item) => item.brand)));
        function appendCheckboxes(data: Data[], arr: string[], elemForAppend: HTMLDivElement) {
            for (const item of arr) {
                const newCheckboxElem = document.createElement('div')
                const newInputElem = document.createElement('input')
                newInputElem.type = 'checkbox'
                newInputElem.id = item
                const labelForInput = document.createElement('label')
                labelForInput.htmlFor = item
                labelForInput.innerText = item
                const qntElem = document.createElement('span')
                const quontity = data.filter((x) => (arr === categoryArr ? x.category : x.brand) === item).length
                qntElem.innerText = ` (${quontity}/${quontity})`
                newCheckboxElem.appendChild(newInputElem)
                newCheckboxElem.appendChild(labelForInput)
                newCheckboxElem.appendChild(qntElem)
                elemForAppend.appendChild(newCheckboxElem)
            }
        }
        appendCheckboxes(this.data, categoryArr, this.CATEGORY_ELEM)
        appendCheckboxes(this.data, brandArr, this.BRAND_ELEM)

        // ----dual-range------
        function controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement) {
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

        function getParsed(currentFrom: { value: string; }, currentTo: { value: string; }) {
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

        this.fromSliderStock.oninput = () => controlFromSlider(this.fromSliderStock, this.toSliderStock, this.fromInputStock);
        this.toSliderStock.oninput = () => controlToSlider(this.fromSliderStock, this.toSliderStock, this.toInputStock);
        this.fromSliderStock.oninput = () => controlFromSlider(this.fromSliderStock, this.toSliderStock, this.fromInputStock);
        this.toSliderStock.oninput = () => controlToSlider(this.fromSliderStock, this.toSliderStock, this.toInputStock);

        // ----listeners-for-range-slider------
        this.fromSlider.addEventListener('input', () => saveInputToTempObj(this.fromSlider, this.toSlider, this.tempObj));
        this.toSlider.addEventListener('input', () => saveInputToTempObj(this.fromSlider, this.toSlider, this.tempObj));

        this.fromSliderStock.addEventListener('input', () => saveInputToTempObjStock(this.fromSliderStock, this.toSliderStock, this.tempObj));
        this.toSliderStock.addEventListener('input', () => saveInputToTempObjStock(this.fromSliderStock, this.toSliderStock, this.tempObj));


        function saveInputToTempObj(fromInput: HTMLInputElement, toInput: HTMLInputElement, tempObj: ITempObj) {
            tempObj.price = [Number(fromInput.value), Number(toInput.value)];
        }
        function saveInputToTempObjStock(fromInput: HTMLInputElement, toInput: HTMLInputElement, tempObj: ITempObj) {
            tempObj.stock = [Number(fromInput.value), Number(toInput.value)];
        }

    }
    _addListenersForCategory() {
        let categoryInputs: NodeListOf<HTMLInputElement> = this.CATEGORY_ELEM.querySelectorAll('input[type=checkbox]')
        for (let i = 0; i < categoryInputs.length; i++) {
            categoryInputs[i].addEventListener('change', (e: Event) => this._categoryHandler((e.currentTarget as HTMLInputElement)))

        }
    }
    _categoryHandler(elem: HTMLInputElement) {
        let brandInputs: NodeListOf<HTMLInputElement> = this.BRAND_ELEM.querySelectorAll('input[type=checkbox]')
        if (elem.checked) {
            this.tempObj.category.push(elem.id)

        } else {
            this.tempObj.category.splice(this.tempObj.category.indexOf(elem.id), 1)

        }
        // this._disableBrandFromCategory(this.tempDataFromFilters, brandInputs)
        this._appendCardsFromTemp()
    }
    _disableBrandFromCategory(tempData: Data[], brandInputs: NodeListOf<HTMLInputElement>) {
        let brandArr = Array.from(new Set(tempData.map((item) => item.brand)));
        if (brandArr.length === 0) {
            Array.from(brandInputs).forEach((item) => item.disabled = false)
            return
        }
        for (let i = 0; i < brandInputs.length; i++) {
            brandInputs[i].disabled = !brandArr.includes(brandInputs[i].id)
        }

    }
    _addListenersForBrands() {
        let brandInputs: NodeListOf<HTMLInputElement> = this.BRAND_ELEM.querySelectorAll('input[type=checkbox]')
        for (let i = 0; i < brandInputs.length; i++) {
            brandInputs[i].addEventListener('change', (e: Event) => this._brandsHandler((e.currentTarget as HTMLInputElement)))
        }

    }
    _brandsHandler(elem: HTMLInputElement) {
        let categoryInputs: NodeListOf<HTMLInputElement> = this.CATEGORY_ELEM.querySelectorAll('input[type=checkbox]')
        if (elem.checked) {
            this.tempObj.brand.push(elem.id)
        } else {
            this.tempObj.brand.splice(this.tempObj.brand.indexOf(elem.id), 1)
        }

        this._appendCardsFromTemp()
    }
    _appendCardsFromTemp() {
        this.productsContainer.innerHTML = ''
        this.tempDataFromFilters = baseData

        if (Object.values(this.tempObj).every((arr) => arr.length === 0)) {
            new Card(baseData).appendCards()
            return
        }
        if (this.tempObj.category.length !== 0) {
            this.tempDataFromFilters = this.tempDataFromFilters.filter((item) => this.tempObj.category.some((itemId) => itemId === item.category))
        }
        if (this.tempObj.brand.length !== 0) {
            this.tempDataFromFilters = this.tempDataFromFilters.filter((item) => this.tempObj.brand.some((itemId) => itemId === item.brand))
        }
        if (this.tempDataFromFilters.length === 0) {
            if (Object.values(this.tempObj).some((arr) => arr.length !== 0)) {
                this.productsContainer.innerText = 'No Items found'
            } else {
                new Card(baseData).appendCards()
            }
            return
        }
        new Card(this.tempDataFromFilters).appendCards()
    }
    addFilters() {
        this._createFilters()
        this._addListenersForCategory()
        this._addListenersForBrands()
    }
}

export default Filters