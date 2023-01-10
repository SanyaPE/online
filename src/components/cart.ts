import baseData, { Data } from './data-base';
import { ILocalStorageCartObj } from './models';

class Cart {
    smryPrQnt = document.querySelector('#smryPrQnt') as HTMLSpanElement;
    totalPrice = document.querySelector('#totalPrice') as HTMLSpanElement;
    cartBtn = document.querySelector('#cartBtn') as HTMLLinkElement;
    productsList = document.querySelector('.cart__products-list') as HTMLDivElement;
    cartElemCounter = document.querySelector('#cartQnt') as HTMLSpanElement;
    init() {
        this.cartBtn.addEventListener('click', () => this.appendProductsFromCart());
    }
    public appendProductsFromCart() {
        this.productsList.innerHTML = `<h2 class="cart__products-container__title">Products in cart</h2>`;
        const parsedStorage: ILocalStorageCartObj = JSON.parse(localStorage.getItem('cart') as string);
        const cartOrderArr = parsedStorage.cartOrder;
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
                cartElem.classList.add('cart__cart-elem');
                itemIndx.classList.add('cart__cart-elem__itemIndx');
                itemInfo.classList.add('cart__cart-elem__itemInfo');
                itemDetails.classList.add('cart__cart-elem__itemDetails');
                itemTitle.classList.add('cart__cart-elem__itemDetails__title');
                itemDescription.classList.add('cart__cart-elem__itemDetails__description');
                itemOther.classList.add('cart__cart-elem__itemDetails__other');
                numberControl.classList.add('cart__cart-elem__numberCntrl');
                qntControl.classList.add('cart__cart-elem__numberCntrl__qnt');

                // ---append-childs---
                cartElem.appendChild(itemIndx);
                cartElem.appendChild(itemInfo);
                cartElem.appendChild(itemDetails);
                cartElem.appendChild(numberControl);
                itemDetails.appendChild(itemTitle);
                itemDetails.appendChild(itemDescription);
                itemDetails.appendChild(itemOther);
                numberControl.appendChild(stockControl);
                numberControl.appendChild(qntControl);
                numberControl.appendChild(amountControl);
                qntControl.appendChild(plusBtn);
                qntControl.appendChild(currQnt);
                qntControl.appendChild(minusBtn);
                // -----------------

                // ----
                const currItem = baseData[itemId - 1];
                itemIndx.innerText = String(++i);
                itemInfo.style.background = `no-repeat url(${currItem.images[0]})`;
                itemInfo.style.backgroundSize = `cover`;
                itemTitle.innerHTML = `<h3>${currItem.title}</h3>`;
                itemDescription.innerText = currItem.description;
                itemOther.innerHTML = `Rating: ${currItem.rating} Discount: ${currItem.discountPercentage}%`;
                stockControl.innerText = `Stock: ${currItem.stock}`;
                plusBtn.innerText = `+`;
                minusBtn.innerText = `-`;
                currQnt.innerText = `${parsedStorage[itemId]}`;
                amountControl.innerText = `Amount: ${currItem.price * parsedStorage[itemId]}$`;
                (this.productsList as HTMLDivElement).appendChild(cartElem);

                plusBtn.addEventListener('click', () =>
                    this.addListenerForPlusBtn(currQnt, amountControl, itemId, currItem)
                );
                minusBtn.addEventListener('click', () =>
                    this.addListenerForMinusBtn(currQnt, amountControl, itemId, currItem)
                );

                this.smryPrQnt.innerText = this.cartElemCounter.innerText;
                this.totalPrice.innerText = `${parsedStorage.cartOrder
                    .map((itemId) => parsedStorage[itemId] * baseData[itemId - 1].price)
                    .reduce((a, b) => a + b)}`;
            };
            cartOrderArr.forEach((item: number, i: number) => appendCards(item, i));
        }
    }
    protected addListenerForPlusBtn(
        QntElem: HTMLSpanElement,
        amountElem: HTMLDivElement,
        itemId: number,
        currItem: Data
    ) {
        const parsedStorage: ILocalStorageCartObj = JSON.parse(localStorage.getItem('cart') as string);
        parsedStorage[itemId] = ++parsedStorage[itemId];
        QntElem.innerText = `${parsedStorage[itemId]}`;
        amountElem.innerText = `Amount: ${currItem.price * parsedStorage[itemId]}$`;
        if (parsedStorage.cartOrder.length) {
            this.cartElemCounter.innerText = String(
                Object.values(parsedStorage)
                    .filter((item) => typeof item === 'number')
                    .reduce((acc, curr) => Number(acc) + Number(curr))
            );
        }
        this.smryPrQnt.innerText = this.cartElemCounter.innerText;
        this.totalPrice.innerText = `${parsedStorage.cartOrder
            .map((itemId) => parsedStorage[itemId] * baseData[itemId - 1].price)
            .reduce((a, b) => a + b)}`;
        localStorage.setItem('cart', JSON.stringify(parsedStorage));
    }
    protected addListenerForMinusBtn(
        QntElem: HTMLSpanElement,
        amountElem: HTMLDivElement,
        itemId: number,
        currItem: Data
    ) {
        const parsedStorage: ILocalStorageCartObj = JSON.parse(localStorage.getItem('cart') as string);
        parsedStorage[itemId] = parsedStorage[itemId] - 1;
        if (parsedStorage.cartOrder.length) {
            this.cartElemCounter.innerText = String(
                Object.values(parsedStorage)
                    .filter((item) => typeof item === 'number')
                    .reduce((acc, curr) => Number(acc) + Number(curr))
            );
        }
        this.smryPrQnt.innerText = this.cartElemCounter.innerText;
        this.totalPrice.innerText = `${parsedStorage.cartOrder
            .map((itemId) => parsedStorage[itemId] * baseData[itemId - 1].price)
            .reduce((a, b) => a + b)}`;
        if (parsedStorage[itemId] === 0) {
            delete parsedStorage[itemId];
            parsedStorage.cartOrder.splice(parsedStorage.cartOrder.indexOf(itemId), 1);
            localStorage.setItem('cart', JSON.stringify(parsedStorage));
            this.appendProductsFromCart();
            return;
        }
        QntElem.innerText = `${parsedStorage[itemId]}`;
        amountElem.innerText = `Amount: ${currItem.price * parsedStorage[itemId]}$`;
        localStorage.setItem('cart', JSON.stringify(parsedStorage));
    }
}
export default Cart;
