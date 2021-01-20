import { items } from './item.js';
import { fetching } from '../ajax.js';
import { getThisEl } from './getThis.js';
import { showNotification } from './showNotif.js';

async function getAllDetailElements({
	imageClickedName,
	itemClickedName,
	priceClickedName,
	favClickedStatus,
}) {
	const img = document.querySelector('.detailImg img');
	const name = document.querySelector('.detailNamePrice h2');
	const price = document.querySelector('.detailNamePrice h3');
	const desc = document.querySelector('.detailDesc p');

	const renderDetailItem = async () => {
		img.setAttribute('src', `${imageClickedName}`);
		name.innerHTML = `${itemClickedName}`;
		price.innerHTML = `${priceClickedName}`;

		for (let i = 0; i < items.length; i++) {
			if (name.textContent === items[i].itemName) {
				desc.innerHTML = `${items[i].descItem}`;
			}
		}
	};

	const backButton = document.querySelector('.pageId svg');
	backButton.addEventListener('click', function () {
		fetching('kerajinan');
	});

	const minButton = document.querySelector('.kurang');
	const addButton = document.querySelector('.tambah');
	const qInput = document.querySelector('.quantity input');
	const addToCartButton = document.querySelector('.addToCartButton');

	let val = parseInt(qInput.value);
	addButton.addEventListener('click', (e) => {
		val += 1;
		qInput.value = `${val}`;
	});

	minButton.addEventListener('click', (e) => {
		if (val === 1) return;
		val -= 1;
		qInput.value = `${val}`;
	});

	addToCartButton.addEventListener('click', function (e) {
		let thisElement = getThisEl(
			this.parentElement.parentElement,
			this.parentElement
		);
		showNotification(thisElement);
		storeData(thisElement);
	});

	renderDetailItem();
}

export { getAllDetailElements };
