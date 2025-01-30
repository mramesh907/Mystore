export const priceDiscount = (price, discount=1) => {
    const discountedPrice = Math.ceil((Number(price) * Number(discount)) / 100)
    const totalPrice = Number(price) - discountedPrice
    return totalPrice;
}