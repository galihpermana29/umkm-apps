import { fetching } from '../ajax.js';
import { getThisEl } from './getThis.js';
import { showNotification } from './showNotif.js';
import { getAllPaymentElements } from './payment.js';

let totalItemPrice = [];
let itemCheckedGoToPayment = [];

async function getAllCartElements(buttonEl) {
	let deleteButton = document.querySelector('.deleteButton');
	let cartTotalPayment = document.querySelector('.cartTotalPayment');
   const cartContainer = document.querySelector('.cartContainer');
   const backButton = document.querySelector('.cartEl .pageId svg')
	let data = await readAllData();
	let totalUserPayForHisProd = 0;

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
						totalItemPrice = [];
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
						totalUserPayForHisProd = totalPaymentSum;
						totalPaymentEl.innerHTML = `Rp${totalUserPayForHisProd}`;
						this.nextElementSibling.children[0].style.display = 'none';
						this.nextElementSibling.children[2].style.display = 'none';
						this.nextElementSibling.children[1].disabled = true;
						this.parentElement.parentElement.classList.add('active');
					} else {
						let data = this.parentElement.parentElement.children[1]
							.children[0].textContent;
						let dataChecked = await readData(data);
						let price = dataChecked.itemPrice.split('k');
						let totalPaymentMin = minPayment(
							parseInt(price[0]),
							parseInt(dataChecked.itemQuantity)
						);
						totalUserPayForHisProd = totalPaymentMin;
						totalPaymentEl.innerHTML = `Rp${totalUserPayForHisProd}`;
						this.nextElementSibling.children[0].style.display = 'inherit';
						this.nextElementSibling.children[2].style.display = 'inherit';
						this.nextElementSibling.children[1].disabled = false;
						this.parentElement.parentElement.classList.remove('active');
					}
				});
			});

			paymentButton.addEventListener('click', async function (e) {
				totalItemPrice = [];
				inputCheck.forEach(async function (input) {
					if (input.checked === true) {
						let data =
							input.parentElement.parentElement.children[1].children[0]
								.textContent;
						let hasil = await readData(data);
						itemCheckedGoToPayment.push(hasil);
					}
            });
            
            if(totalUserPayForHisProd === 0) {
               alert('Pilih item yang ingin di bayar')
               return;
            }

				fetching('payment', itemCheckedGoToPayment, totalUserPayForHisProd);

				setTimeout(() => {
					itemCheckedGoToPayment = [];
				}, 1000);
			});
		}

      ifCartChecked();
      backButton.addEventListener('click', function(e) {
         fetching('kerajinan')
      })
	}

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

	renderCartElements();
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

export { getAllCartElements };
