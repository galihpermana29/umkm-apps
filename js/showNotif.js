function showNotification({ itemName, itemPrice, itemImg, itemQuantity }) {
	const addToNotifContainer = document.querySelector('.addToNotifContainer');
   let itemDesc = 'Berhasil di tambahkan ke keranjang';
   
	if (itemName === 'Pesanan') {
		let itemOrderId = itemPrice;
		itemDesc = `( ${itemOrderId} ) Berhasil dibuat`;
		addToNotifContainer.innerHTML = `
         <div class="imgNotif">
            <img src="${itemImg}" alt="${itemName}">
         </div>
         <div class="textNotif">
            <h3>${itemName}</h3>
            <p>${itemDesc}</p>
         </div>`;
	} else if (itemName !== 'Item') {
		addToNotifContainer.innerHTML = `
         <div class="imgNotif">
            <img src="${itemImg}" alt="${itemName}">
         </div>
         <div class="textNotif">
            <h3>${itemName}</h3>
            <p>${itemDesc}</p>
         </div>`;
	} else if (itemName === 'Item') {
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

export { showNotification };
