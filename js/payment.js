import { fetching } from '../ajax.js';
// const uuid = require('uuid')
// uuid()

async function getAllPaymentElements(data, total) {
	const containerDescItem = document.querySelector('.itemDescBody .opsi');
	const containerPaymentItem = document.querySelector(
		'.paymentTotalPayment .totalPayment p'
	);
	const backButton = document.querySelector('.paymentEl .pageId svg');

	async function renderPaymentItem(data, total) {
		data.forEach((data) => {
			containerDescItem.innerHTML += `
         <div class="itemDesc">
            <p>${data.itemName}</p>
            <p>Rp${data.itemPrice} <span>x${data.itemQuantity}</span></p>
         </div>`;
		});
		containerPaymentItem.innerHTML = `Rp${total}`;
	}

	async function addressShipping() {
		const saveButton = document.querySelector('.addressHead p');
		const shippingCheckBoxEl = document.querySelectorAll('#shipping');
		const paymentCheckBoxEl = document.querySelectorAll('#payment');
		const paymentButton = document.querySelector(
			'.paymentTotalPayment .paymentButton'
		);

		function saveButtonAction() {
			const saveAddress = document.querySelector(
				'.addressBody .addressText'
			);
			const inputElAddress = document.querySelector('.addressBody textArea');

			let addressValue = this.parentElement.nextElementSibling.children[1]
				.value;

			if (addressValue === '') return;

			saveAddress.classList.toggle('active');
			inputElAddress.classList.toggle('nonactive');

			saveAddress.innerHTML = addressValue;
			if (inputElAddress.className === 'nonactive') {
				saveButton.innerHTML = 'Ubah';
			} else {
				saveButton.innerHTML = 'Simpan';
			}
		}

		function onPaymentButtonClicked(cStatus) {
			function checkCheckboxStatus() {
				let shippingCStatus = 0;
				let paymentCStatus = 0;

				for (let i = 0; i < shippingCheckBoxEl.length; i++) {
					if (shippingCheckBoxEl[i].checked === true) {
						shippingCStatus += 1;
					}

					if (paymentCheckBoxEl[i].checked === true) {
						paymentCStatus += 1;
					}
				}

				if (shippingCStatus === 2 || paymentCStatus === 2) {
					alert('Pilih salah satu opsi saja');
					return;
				} else if (shippingCStatus === 0 || paymentCStatus === 0) {
					alert('Pilih salah satu opsi yang tersedia');
					return;
            }
            
            let checkboxEl = []

				if (shippingCStatus === 1 || paymentCStatus === 1) {
					for (let i = 0; i < shippingCheckBoxEl.length; i++) {
						if (shippingCheckBoxEl[i].checked === true) {
							checkboxEl.push(shippingCheckBoxEl[i].previousElementSibling.textContent)
						}

						if (paymentCheckBoxEl[i].checked === true) {
							checkboxEl.push(paymentCheckBoxEl[i].previousElementSibling.textContent)
						}
               }
               return checkboxEl;
            }
            
            
			}

			function checkTextareaStatus() {
				let status =
					saveButton.parentElement.nextElementSibling.children[1].value;

				if (status === '') {
					alert('Isi alamat pengiriman');
					return;
            } else {
               return status;
            }
            
			}

			function getAllItemForStore() {
            let checkboxEl = checkCheckboxStatus();
            console.log(checkboxEl)
            let addressOrder = checkTextareaStatus();
            console.log(addressOrder)

				let item = {
					orderID: uuidv4(),
					orderItem: data,
					orderTotal: total,
					orderShipping: checkboxEl[0],
					orderPayment: checkboxEl[1],
            };
            storeDataP(item);
            data.forEach(data => {
               deleteData(data)
            })
            alert('Fitur sedang dikembangkan, terima kasih')
			}

			
			
			getAllItemForStore();
			console.log(uuidv4());
		}

		saveButton.addEventListener('click', saveButtonAction);
		paymentButton.addEventListener('click', onPaymentButtonClicked);
	}

	renderPaymentItem(data, total);
	addressShipping();
	backButton.addEventListener('click', function (e) {
		fetching('cart');
	});
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export { getAllPaymentElements };
