import baseData from "./data-base"

class Cart {
    cartBtn: any
    productsList: HTMLDivElement | undefined

    constructor() {
    }
    init() {
        this.cartBtn = document.querySelector('#cartBtn') as HTMLLinkElement
        this.cartBtn.addEventListener('click', () => this.appendProductsFromCart())
    }
    public appendProductsFromCart() {
        this.productsList = document.querySelector('.cart__products-list') as HTMLDivElement
        let parsedStorage = JSON.parse(localStorage.getItem('cart') as string)
        let values = Object.values(parsedStorage).filter((item) => typeof item === 'number')
        let cartOrderArr = parsedStorage.cartOrder
        if (cartOrderArr.length) {

            const appendCards = (itemId: number, i: number) => {
                // ---
                const cartElem = document.createElement('div');
                // ------------------
                const itemIndx = document.createElement('div');
                // ------------------
                const itemInfo = document.createElement('div');
                // ------------------
                const itemDetails = document.createElement('div');
                const itemTitle = document.createElement('div');
                const itemDescription = document.createElement('div');
                const itemOther = document.createElement('div');
                // ------------------
                const numberControl = document.createElement('div');
                const stockControl = document.createElement('div');
                // ----
                const qntControl = document.createElement('div');
                const plusBtn = document.createElement('button');
                const currQnt = document.createElement('span');
                const minusBtn = document.createElement('button');
                // ----
                const amountControl = document.createElement('div');
                // ----classes--------
                // ---append-childs---
                cartElem.appendChild(itemIndx)
                cartElem.appendChild(itemInfo)
                cartElem.appendChild(itemDetails)
                cartElem.appendChild(numberControl)
                itemDetails.appendChild(itemTitle)
                itemDetails.appendChild(itemDescription)
                itemDetails.appendChild(itemOther)
                numberControl.appendChild(stockControl)
                numberControl.appendChild(qntControl)
                numberControl.appendChild(amountControl)
                qntControl.appendChild(plusBtn)
                qntControl.appendChild(currQnt)
                qntControl.appendChild(minusBtn)
                // -----------------

                // ----
                const currItem = baseData[itemId - 1]
                itemIndx.innerText = String(++i)
                cartElem.style.background = currItem.images[0]
                itemTitle.innerHTML = `<h3>${currItem.title}</h3>`
                itemDescription.innerText = currItem.description
                itemOther.innerHTML = `${currItem.rating}${currItem.discountPercentage}`
                stockControl.innerText = `Stock: ${currItem.stock}`
                currQnt.innerText = `${parsedStorage[itemId]}`
                amountControl.innerText = `Amount: ${currItem.price * parsedStorage[itemId]}`
                this.productsList.appendChild(cartElem)
            }
            cartOrderArr.forEach((item: number, i: number) => appendCards(item, i))
        }
    }

}
export default Cart