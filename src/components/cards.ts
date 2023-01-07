import { Data } from './data-base.js';

class Card {
    data: Data[];
    constructor(data: Data[]) {
        this.data = data;
    }
    _createCard(obj: Data) {
        const cardId = obj.id
        const cardElem = document.createElement('div');
        cardElem.setAttribute('id', String(cardId))
        cardElem.classList.add('card');
        cardElem.style.background = `URL(${obj.images[0]}) 0 0 /cover`;
        const cardName = document.createElement('div');
        cardName.classList.add('card__title');
        const infoElem = document.createElement('div');
        infoElem.classList.add('card__info');
        const cardBtns = document.createElement('div');
        cardBtns.classList.add('card__btns');
        const addBtn = document.createElement('button');
        const detailsBtn = document.createElement('button');
        cardBtns.appendChild(addBtn);
        cardBtns.appendChild(detailsBtn);

        cardName.innerText = obj.title;
        infoElem.innerText = `Category: ${obj.category}\nBrand: ${obj.brand}\nPrice: ${obj.price}$
                                Discount: ${obj.discountPercentage}%\nRating: ${obj.rating}\nStock: ${obj.stock}`;
        addBtn.innerText = 'ADD TO CART';
        detailsBtn.innerText = 'DETAILS';
        cardElem.appendChild(cardName);
        cardElem.appendChild(infoElem);
        cardElem.appendChild(cardBtns);
        return cardElem;
    }
    appendCards() {
        this.data.forEach((obj) => {
            const cardElem = this._createCard(obj);
            const block = document.querySelector('.products__items');
            block?.appendChild(cardElem);
        });
    }
}

// function createCard(obj: Data) {
//     const cardElem = document.createElement('div');
//     cardElem.classList.add('card');
//     cardElem.style.background = `URL(${obj.images[0]}) 0 0 /cover`;
//     const cardName = document.createElement('div');
//     cardName.classList.add('card__title');
//     const infoElem = document.createElement('div');
//     infoElem.classList.add('card__info');
//     const cardBtns = document.createElement('div');
//     cardBtns.classList.add('card__btns');
//     const addBtn = document.createElement('button');
//     const detailsBtn = document.createElement('button');
//     cardBtns.appendChild(addBtn);
//     cardBtns.appendChild(detailsBtn);

//     cardName.innerText = obj.title;
//     infoElem.innerText = `Category: ${obj.category}\nBrand: ${obj.brand}\nPrice: ${obj.price}$
//                             Discount: ${obj.discountPercentage}%\nRating: ${obj.rating}\nStock: ${obj.stock}`;
//     addBtn.innerText = 'ADD TO CART';
//     detailsBtn.innerText = 'DETAILS';
//     cardElem.appendChild(cardName);
//     cardElem.appendChild(infoElem);
//     cardElem.appendChild(cardBtns);
//     return cardElem;
// }

// function appendCards(data: Data[]) {
//     data.forEach((obj) => {
//         const cardElem = createCard(obj);
//         const block = document.querySelector('.products__items');
//         block?.appendChild(cardElem);
//     });
// }
// export default appendCards;
export default Card;
