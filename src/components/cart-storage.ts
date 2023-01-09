class cartStorage {
    cartElem = document.querySelector('#cartQnt') as HTMLSpanElement
    checkStorage() {
        let parsedStorage = JSON.parse(localStorage.getItem('cart') as string)
        if (parsedStorage.cartOrder.length) {
            this.cartElem.innerText = String((Object.values(parsedStorage)
                .filter((item) => typeof item === 'number'))
                .reduce((acc, curr) => Number(acc) + Number(curr)))
            return
        }
        localStorage.setItem('cart', JSON.stringify({
            cartOrder: []
        }))
    }
}
export default cartStorage