module.exports = (temp, product) => {
    if (!product.organic) {
        temp = temp.replace("{%NOT_ORGANIC%}", 'not-organic')
    }
    let keys = Object.keys(product);
    keys.forEach((v, i, arr) => {
        temp = temp.split(`{%${v.toUpperCase()}%}`).join(product[v]);
    });
    return temp;
}