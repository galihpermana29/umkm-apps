import { items } from './item.js';
import { fetching } from '../ajax.js';
import { getThisEl } from './getThis.js';

function getAllKerajinanElements(name) {
	const cardItemsContainer = document.querySelector('.cardItemsContainer');

	const renderCardItems = () => {
		items.forEach((item) => {
			cardItemsContainer.innerHTML += `
         <div class="cards">
            <div class="cardItems">
               <img src="img/${item.imageName}.png" alt="${item.itemName}">
               <div class="names">
                  <h4 class="itemName">${item.itemName}</h4>
                  <h4 class="itemPrice">${item.priceItem}k</h4>
               </div>
            </div>
            <svg
               class=""
               xmlns="http://www.w3.org/2000/svg"
               width="22"
               height="22"
               fill="currentColor"
               class="bi bi-heart-fill"
               viewBox="0 0 16 16">
               <path
               fill-rule="evenodd"
               d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
         </div>`;
		});

		const favoriteButton = document.querySelectorAll('.cards svg');
		favoriteButton.forEach((icon) => {
			icon.addEventListener('click', (e) => {
				icon.classList.toggle('fav');
			});
		});
	};

	const getAllItemsPropertiesForDetailsPage = () => {
		const cardItems = document.querySelectorAll('.cardItems');
		cardItems.forEach(function (item) {
			item.addEventListener('click', function (e) {
				if (this.className === 'cardItems') {
					let thisElement = getThisEl(this);

					let { itemName, itemPrice, itemImg, itemQuantity } = thisElement;
					let favStatus = false;

					if (this.nextElementSibling.classList[0] === 'fav') {
						favStatus = true;
					}

					let itemProperties = {
						imageClickedName: itemImg,
						itemClickedName: itemName,
						priceClickedName: itemPrice,
						favClickedStatus: favStatus,
					};

					fetching('detail', itemProperties);
				}
			});
		});
	};

	renderCardItems();
	getAllItemsPropertiesForDetailsPage();
}

export { getAllKerajinanElements };
