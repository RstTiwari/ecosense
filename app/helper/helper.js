const helper = {
  getProductCounter: function(){
    let day = new Date().getDay()
    let hour = new Date().getHours()
    let min = new Date().getMinutes()
    let second = new Date().getSeconds()
    let productId = `${day}${hour}${min}${second}` 
    return productId
  }
};

module.exports = helper