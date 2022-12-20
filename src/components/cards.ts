import data from './data-base.js';
import { infoData } from './data-base.js';

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

function createCard(obj: infoData) {
    const cardElem = document.createElement('div');
    const cardName = document.createElement('div');
    const infoElem = document.createElement('div');
    const addBtn = document.createElement('button');
    const detailsBtn = document.createElement('button');

    cardName.innerText = obj.title
    infoElem.innerText = `${obj.category}\n${obj.brand}\n${obj.price}$\n
                            ${obj.discountPercentage}%\n${obj.rating}\n${obj.stock}\n`
    addBtn.innerText = 'ADD TO CART'
    detailsBtn.innerText = 'DETAILS'
    cardElem.appendChild(cardName)
    cardElem.appendChild(infoElem)
    cardElem.appendChild(addBtn)
    cardElem.appendChild(detailsBtn)
    return cardElem
}

function appendCards(data: infoData[]) {
    data.forEach((obj) => {
        let cardElem = createCard(obj);
        console.log(cardElem);

        let block = document.querySelector('.store__container');
        console.log(block);

        block?.appendChild(cardElem)
    })
}

export default appendCards