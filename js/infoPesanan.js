import { fetching } from '../ajax.js';

async function getAllInfoPesananElements(orderID) {
   let data = await readDataP(orderID)
   const backButton = document.querySelector('.infoPesananEl .pageId svg')
   async function renderItemProp(){
      let addressEl = document.querySelector('.infoPesananContainer .addressText')
      let orderIDEl = document.querySelector('.infoPesananContainer .orderID p')
      let shippingEl = document.querySelector('.infoPesananContainer .shippingEl .opsi ul li p')
      let paymentEl = document.querySelector('.infoPesananContainer .paymentEl .opsi ul li p')
      let itemElContainer = document.querySelector('.infoPesananContainer .itemDescEl .opsi')
      let totalEl = document.querySelector('.totalPaymentEl p')

      addressEl.innerHTML = `${data.orderAddress}`
      shippingEl.innerHTML = `${data.orderShipping}`
      paymentEl.innerHTML = `${data.orderPayment}`
      totalEl.innerHTML = `Rp${data.orderTotal}`
      orderIDEl.innerHTML = `${data.orderID}`

      data.orderItem.forEach(item=> {
         itemElContainer.innerHTML += 
         `<div class="itemDesc">
            <p>${item.itemName}</p>
            <p>Rp${item.itemPrice} <span>x${item.itemQuantity}</span></p>
         </div>`
      })
   }

   backButton.addEventListener('click', e => {
      fetching('pesanan')
   })
   renderItemProp();
}

export { getAllInfoPesananElements };
