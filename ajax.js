import items from './js/item.js';
import { getThisEl } from './js/getThis.js';

let totalItemPrice = [];

const container = document.querySelector('.container');
const icons = document.querySelectorAll('.icon');

function fetching(name, options) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				container.innerHTML = this.response;
				if (name === 'home') getAllHomeElements(name);
				if (name === 'kerajinan') getAllKerajinanElements(name);
				if (name === 'detail') getAllDetailElements(options);
				if (name === 'cart') getAllCartElements(options);
			} else if (xhr.status !== 4) {
				console.log('eror brou');
			}
		}
	};

	if (window.location.hash == '' && name === undefined) {
		name = 'home';
	}

	icons.forEach((icon) => {
		let i = icon.querySelector('svg');
		if (icon.dataset.name === name) {
			i.style.color = 'white';
		} else {
			i.style.color = '#9394d6';
		}
	});

	xhr.open('GET', `./pages/${name}.html`);
	xhr.send();
}

fetching();

function getAllHomeElements(name) {
	const categoriCardElements = document.querySelectorAll('.card a');

	function fetchCategoryShopPage() {
		categoriCardElements.forEach((cardEl) => {
			cardEl.addEventListener('click', (e) => {
				let nameCard = cardEl.dataset.kategori;
				e.preventDefault();
				fetching(nameCard);
			});
		});
	}

	fetchCategoryShopPage();
}

function iconsOnClickAction() {
	const icons = document.querySelectorAll('.icon');
	icons.forEach((icon) => {
		icon.addEventListener('click', (e) => {
			let nameIcon = icon.dataset.name;
			fetching(nameIcon);
		});
	});
}

iconsOnClickAction();

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

async function getAllCartElements(buttonEl) {
	let deleteButton = document.querySelector('.deleteButton');
	let cartTotalPayment = document.querySelector('.cartTotalPayment');
	const cartContainer = document.querySelector('.cartContainer');
	let data = await readAllData();

	async function renderCartElements() {
		let isDataEmpty = checkIsDataEmpty(data);
		if (isDataEmpty) {
         totalItemPrice = [];
			return;
		} else {
			data.forEach((data) => {
				cartContainer.innerHTML += `
               <div class="cartItem">
                  <div class="cartItemImg">
                     <img src="${data.itemImg}" alt="${data.itemName}" />
                  </div>
                  <div class="cartItemNamePrice">
                     <h2>${data.itemName}</h2>
                     <h4>${data.itemPrice}</h4>
                  </div>
                  <div class="cartCheck">
                     <input type="checkbox" name="checkbox" id="checkbox"/>
                     <div class="quantity">
                        <div class="qButton kurang">
                           <h2>-</h2>
                        </div>
                        <input
                           type="number"
                           name="quantity"
                           min="1"
                           max="10"
                           value="${data.itemQuantity}"
                        />
                        <div class="qButton tambah">
                           <h2>+</h2>
                        </div>
                     </div>
                  </div>
               </div>`;
			});
		}

		const minButton = document.querySelectorAll('.cartCheck .kurang');
		const addButton = document.querySelectorAll('.cartCheck .tambah');

		addButton.forEach(function (add) {
			add.addEventListener('click', function (e) {
				const input = this.parentElement.children[1];
				let value = parseInt(input.value);
				value += 1;
				input.value = `${value}`;

				let data = getThisEl(
					this.parentElement.parentElement.parentElement,
					this.parentElement.parentElement
				);
				storeData(data);
			});
		});
		minButton.forEach(function (min) {
			min.addEventListener('click', function (e) {
				let input = this.parentElement.children[1];
				let value = parseInt(input.value);
				if (value === 1) return;
				value -= 1;
				input.value = `${value}`;

				let data = getThisEl(
					this.parentElement.parentElement.parentElement,
					this.parentElement.parentElement
				);
				storeData(data);
			});
		});

		async function ifCartChecked() {
			let deleteButton = document.querySelector('.deleteButton');
			let inputCheck = document.querySelectorAll('#checkbox');
         const paymentButton = document.querySelector('.paymentButton');

			deleteButton.addEventListener('click', function (e) {
				inputCheck.forEach(function (input) {
					if (input.checked === true) {
						let parentElOfChecked = input.parentElement.parentElement;
						let data =
							input.parentElement.parentElement.children[1].children[0]
								.textContent;
						let itemSuccess = {
							itemName: 'Item',
							itemPric: '0',
							itemImg: 'img/icons/check2.svg',
						};
						showNotification(itemSuccess);
						deleteData(data);
						parentElOfChecked.remove();
						fetching('cart');
					}
				});
			});
			let totalPaymentEl = document.querySelector('.totalPayment p');
			inputCheck.forEach(async function (cartInput) {
				cartInput.addEventListener('click', async function (e) {
					if (this.checked === true) {
						let data = this.parentElement.parentElement.children[1]
							.children[0].textContent;
						let dataChecked = await readData(data);
						let price = dataChecked.itemPrice.split('k');
						let totalPaymentSum = totalPayment(
							parseInt(price[0]),
							parseInt(dataChecked.itemQuantity)
						);
						totalPaymentEl.innerHTML = `Rp${totalPaymentSum}`;
                  this.nextElementSibling.children[0].style.display = "none"
                  this.nextElementSibling.children[2].style.display = "none"
                  this.nextElementSibling.children[1].disabled = true
                  
                  paymentButton.addEventListener('click', async function (e) {
                     fetching('payment')
                  });

					} else {
						let data = this.parentElement.parentElement.children[1]
							.children[0].textContent;
						let dataChecked = await readData(data);
						let price = dataChecked.itemPrice.split('k');
						let totalPaymentMin = minPayment(
							parseInt(price[0]),
							parseInt(dataChecked.itemQuantity)
						);
                  totalPaymentEl.innerHTML = `Rp${totalPaymentMin}`;
                  this.nextElementSibling.children[0].style.display = "inherit"
                  this.nextElementSibling.children[2].style.display = "inherit"
                  this.nextElementSibling.children[1].disabled = false
					}
				});
			});


		}

		ifCartChecked();
	}

	renderCartElements();

	function checkIsDataEmpty(data) {
		if (data[0] === undefined) {
			cartTotalPayment.classList.remove('active');
			deleteButton.classList.remove('active');
			cartContainer.innerHTML = `
            <p class="ifCartKosong">Keranjang kamu kosong...</p>`;
			return true;
		} else {
			cartTotalPayment.classList.add('active');
			deleteButton.classList.add('active');
			return false;
		}
	}
}

function totalPayment(price, quantity) {
	let itemTotal = price * quantity * 1000;
	totalItemPrice.push(itemTotal);
	let sum = totalItemPrice.reduce((acc, curr) => {
		return acc + curr;
	});
	return sum;
}

function minPayment(price, quantity) {
	let itemTotal = price * quantity * 1000;
	let find = totalItemPrice.indexOf(itemTotal);
	totalItemPrice.splice(find, 1);
	let sum;
	if (totalItemPrice[0] !== undefined) {
		sum = totalItemPrice.reduce((acc, curr) => {
			return acc + curr;
		});
		return sum;
	} else {
		return 0;
	}
}

function showNotification({ itemName, itemPrice, itemImg, itemQuantity }) {
	const addToNotifContainer = document.querySelector('.addToNotifContainer');
	let itemDesc = 'Berhasil di tambahkan ke keranjang';
	if (itemName !== 'Item') {
		addToNotifContainer.innerHTML = `
         <div class="imgNotif">
            <img src="${itemImg}" alt="${itemName}">
         </div>
         <div class="textNotif">
            <h3>${itemName}</h3>
            <p>${itemDesc}</p>
         </div>`;
	} else {
		itemDesc = 'Berhasil dihapus dari keranjang';
		addToNotifContainer.innerHTML = `
         <div class="imgNotif">
            <img src="${itemImg}" alt="${itemName}">
         </div>
         <div class="textNotif">
            <h3>${itemName}</h3>
            <p>${itemDesc}</p>
         </div>`;
	}

	addToNotifContainer.classList.add('active');
	setTimeout(() => {
		addToNotifContainer.classList.remove('active');
	}, 2000);
}
