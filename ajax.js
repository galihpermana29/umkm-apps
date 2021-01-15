const container = document.querySelector('.container');
const icons = document.querySelectorAll('.icon');
const imageName = [
	{
		imageName: 'kursi_estetik',
		itemName: 'Kursi Minimalis',
		priceItem: 200,
	},
	{
		imageName: 'lampu-belajar',
		itemName: 'Lampu Belajar',
		priceItem: 180,
	},
	{
		imageName: 'jam',
		itemName: 'Jam Dinding',
		priceItem: 70,
	},
	{
		imageName: 'meja_cafe',
		itemName: 'Meja Cafe',
		priceItem: 100,
	},
	{
		imageName: 'phone_holder',
		itemName: 'Penyanggah Hp',
		priceItem: 50,
	},
	{
		imageName: 'tempat_pisau',
		itemName: 'Tempat Pisau',
		priceItem: 40,
	},
];

function fetching(name) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				container.innerHTML = this.response;
				getKategoriElements();
				if (name == 'kerajinan') {
					insertCardItems();
				}
			} else if (xhr.status !== 4) {
				console.log('eror brou');
			}
		}
	};

	if (window.location.hash == '' && name === undefined) {
		name = 'home';
		console.log('t');
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

icons.forEach((icon) => {
	icon.addEventListener('click', (e) => {
		let nameIcon = icon.dataset.name;
		fetching(nameIcon);
	});
});

function getKategoriElements() {
	const kategoriCardElements = document.querySelectorAll('.card a');
	kategoriCardElements.forEach((cardEl) => {
		cardEl.addEventListener('click', (e) => {
			let nameCard = cardEl.dataset.kategori;
			e.preventDefault();
			fetching(nameCard);
		});
	});
}

function insertCardItems() {
	const cardItemsContainer = document.querySelector('.cardItemsContainer');
	imageName.forEach((image) => {
		cardItemsContainer.innerHTML += `
      <div class="cardItems">
         <img src="/img/${image.imageName}.png" alt="${image.itemName}">
         <div class="names">
            <h4 class="itemName">${image.itemName}</h4>
            <h4 class="itemPrice">${image.priceItem}k</h4>
         </div>
         <svg
            class="t"
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

	const favoriteIcons = document.querySelectorAll('.cardItems svg');
	favoriteIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
         icon.classList.toggle('fav')
      })
   })
}
