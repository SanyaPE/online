import { Data } from './data-base'
class Filters {
    data: Data[];
    CATEGORY_ELEM: HTMLDivElement;
    BRAND_ELEM: HTMLDivElement;
    PRICE_ELEM: HTMLDivElement;
    STOCK_ELEM: HTMLDivElement;
    constructor(data: Data[]) {
        this.data = data;
        this.CATEGORY_ELEM = document.querySelector("[filtername='category'] .filters__list") as HTMLDivElement
        this.BRAND_ELEM = document.querySelector("[filtername='brand'] .filters__list") as HTMLDivElement
        this.PRICE_ELEM = document.querySelector("[filtername='category'] .filters__list") as HTMLDivElement
        this.STOCK_ELEM = document.querySelector("[filtername='brand'] .filters__list") as HTMLDivElement
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
                qntElem.innerText = `${quontity}/${quontity}`
                newCheckboxElem.appendChild(newInputElem)
                newCheckboxElem.appendChild(labelForInput)
                newCheckboxElem.appendChild(qntElem)
                elemForAppend.appendChild(newCheckboxElem)
            }
        }
        appendCheckboxes(this.data, categoryArr, this.CATEGORY_ELEM)
        appendCheckboxes(this.data, brandArr, this.BRAND_ELEM)

    }
}

export default Filters