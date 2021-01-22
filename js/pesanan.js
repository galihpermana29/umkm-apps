import { fetching } from '../ajax.js';

async function getAllPesananElements() {
	async function renderPesananCards() {
		let data = await readAllDataP();
		console.log(data.orderTotal, data.orderID);
		data.forEach((data) => {
			const pesananContainer = document.querySelector('.pesananContainer');
         pesananContainer.innerHTML += `
         <div class="pesananItem">
            <div class="pesananItemImg">
               <img src="img/icons/box-seam.svg" alt="" />
            </div>
            <div class="pesananItemNamePrice">
               <h2>${data.orderItem[0].itemName}</h2>
               <h4>Rp${data.orderTotal}</h4>
            </div>
         </div>

      `;
		});
	}

	renderPesananCards();
}

export { getAllPesananElements };
