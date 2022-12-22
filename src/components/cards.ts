import data from './data-base.js';
import { Data } from './data-base.js';
import './store';


// class Card {
//     id: number;
//     title: string;
//     description: string;
//     price: number;
//     discountPercentage: number;
//     rating: number;
//     stock: number;
//     brand: string;
//     category: string;
//     thumbnail: string;
//     images: string[];
//     constructor(info: infoData) {
//         this.id = info.id;
//         this.title = info.title;
//         this.description = info.description;
//         this.price = info.price;
//         this.discountPercentage = info.discountPercentage;
//         this.rating = info.rating;
//         this.stock = info.stock;
//         this.brand = info.brand;
//         this.category = info.category;
//         this.thumbnail = info.thumbnail;
//         this.images = info.images;
//     }

// }

function createCard(obj: Data) {
    const cardElem = document.createElement('div');
    cardElem.classList.add('card')
    cardElem.style.background = `URL(${obj.images[0]}) 0 0 /cover`
    const cardName = document.createElement('div');
    cardName.classList.add('card__title')
    const infoElem = document.createElement('div');
    infoElem.classList.add('card__info')
    const cardBtns = document.createElement('div')
    cardBtns.classList.add('card__btns')
    const addBtn = document.createElement('button');
    const detailsBtn = document.createElement('button');
    cardBtns.appendChild(addBtn)
    cardBtns.appendChild(detailsBtn)

    cardName.innerText = obj.title
    infoElem.innerText = `Category: ${obj.category}\nBrand: ${obj.brand}\nPrice: ${obj.price}$
                            Discount: ${obj.discountPercentage}%\nRating: ${obj.rating}\nStock: ${obj.stock}`
    addBtn.innerText = 'ADD TO CART'
    detailsBtn.innerText = 'DETAILS'
    cardElem.appendChild(cardName)
    cardElem.appendChild(infoElem)
    cardElem.appendChild(cardBtns)
    return cardElem
}

function appendCards(data: Data[]) {
    data.forEach((obj) => {
        let cardElem = createCard(obj);
        let block = document.querySelector('.products__items');
        block?.appendChild(cardElem)
    });
}
export default appendCards