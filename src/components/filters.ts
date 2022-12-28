import { Data } from './data-base'
class Filters {
    data: Data[];
    CATEGORY_ELEM: HTMLDivElement;
    BRAND_ELEM: HTMLDivElement;
    PRICE_ELEM: HTMLDivElement;
    STOCK_ELEM: HTMLDivElement;
    fromSlider: HTMLInputElement;
    toSlider: HTMLInputElement;
    fromInput: HTMLInputElement;
    toInput: HTMLInputElement;
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
    }
    _addFilters() {
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
        function controlFromInput(fromSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement) {
            const [from, to] = getParsed(fromInput, toInput);
            if (from > to) {
                fromSlider.value = String(to);
                fromInput.value = String(to);
            } else {
                fromSlider.value = String(from);
            }
        }

        function controlToInput(toSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement) {
            const [from, to] = getParsed(fromInput, toInput);
            setToggleAccessible(toInput);
            if (from <= to) {
                toSlider.value = String(to);
                toInput.value = String(to);
            } else {
                toInput.value = String(from);
            }
        }

        function controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement) {
            const [from, to] = getParsed(fromSlider, toSlider);
            if (from > to) {
                fromSlider.value = String(to);
                fromInput.value = String(to);
            } else {
                fromInput.value = String(from);
            }
        }

        function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
            const [from, to] = getParsed(fromSlider, toSlider);
            setToggleAccessible(toSlider);
            if (from <= to) {
                toSlider.value = String(to);
                toInput.value = String(to);
            } else {
                toInput.value = String(from);
                toSlider.value = String(from);
            }
        }

        function getParsed(currentFrom: { value: string; }, currentTo: { value: string; }) {
            const from = parseInt(currentFrom.value, 10);
            const to = parseInt(currentTo.value, 10);
            return [from, to];
        }

        function setToggleAccessible(currentTarget: HTMLInputElement) {
            const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
            if (Number(currentTarget.value) <= 0) {
                toSlider.style.zIndex = '2';
            } else {
                toSlider.style.zIndex = '0';
            }
        }

        setToggleAccessible(this.toSlider);

        this.fromSlider.oninput = () => controlFromSlider(this.fromSlider, this.toSlider, this.fromInput);
        this.toSlider.oninput = () => controlToSlider(this.fromSlider, this.toSlider, this.toInput);
        this.fromInput.oninput = () => controlFromInput(this.fromSlider, this.fromInput, this.toInput, this.toSlider);
        this.toInput.oninput = () => controlToInput(this.toSlider, this.fromInput, this.toInput, this.toSlider);
    }
}

export default Filters