import { fetching } from '../ajax.js';

async function getAllPaymentElements(data, total) {
	const containerDescItem = document.querySelector('.itemDescBody .opsi');
	const containerPaymentItem = document.querySelector(
		'.paymentTotalPayment .totalPayment p'
   );
   const backButton = document.querySelector('.paymentEl .pageId svg')

   
   
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
         }

         function checkTextareaStatus() {
            let status = saveButton.parentElement.nextElementSibling.children[1]
            .value
            
            if (status === '') {
               alert('Isi alamat pengiriman')
               return
            }
         }
         
         checkCheckboxStatus();
         checkTextareaStatus();
		}

		saveButton.addEventListener('click', saveButtonAction);
		paymentButton.addEventListener('click', onPaymentButtonClicked);
	}


   renderPaymentItem(data, total);
	addressShipping();
   backButton.addEventListener('click', function(e) {
      fetching('cart')
   })
}

export { getAllPaymentElements };
