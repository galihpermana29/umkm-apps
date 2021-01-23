import { fetching } from '../ajax.js';

async function getAllPesananElements() {
   let data = await readAllDataP();
	async function renderPesananCards() {
		data.forEach((data) => {
			const pesananContainer = document.querySelector('.pesananContainer');
         pesananContainer.innerHTML += `
         <div class="pesananItem">
            <div class="pesananItemImg">
               <img src="img/icons/box-seam.svg" alt="" data-id="${data.orderID}"/>
            </div>
            <div class="pesananItemNamePrice">
               <h2>${data.orderItem[0].itemName}</h2>
               <h4>Rp${data.orderTotal}</h4>
            </div>
         </div>

      `;
		});
   }
   
   function pesananDetail(){
      const cardPesananItem = document.querySelectorAll('.pesananItem')
      cardPesananItem.forEach(function (cardP) {
         cardP.addEventListener('click', function(e) {
            let orderID = this.children[0].children[0].dataset.id
            fetching('infoPesanan', orderID)
         })
      })
   }  

   renderPesananCards();
   pesananDetail();
}

export { getAllPesananElements };
