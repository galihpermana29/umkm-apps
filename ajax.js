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
				// console.log(this.response)
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
      <div class="cards">
         <div class="cardItems">
            <img src="img/${image.imageName}.png" alt="${image.itemName}">
            <div class="names">
               <h4 class="itemName">${image.itemName}</h4>
               <h4 class="itemPrice">${image.priceItem}k</h4>
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

	const favoriteIcons = document.querySelectorAll('.cards svg');
	favoriteIcons.forEach(function (icon) {
		icon.addEventListener('click', function (e) {
			icon.classList.toggle('fav');
			// console.dir(this);
		});
	});

	const cardItems = document.querySelectorAll('.cardItems');
	cardItems.forEach(function (item) {
		item.addEventListener('click', function (e) {
			if (this.className === 'cardItems') {
				// console.dir(this.nextElementSibling);
				const imgClickName = this.children[0].attributes[0].value;
				const itemClickName = this.children[1].children[0].textContent;
				const priceClickName = this.children[1].children[1].textContent;
				let favStatus = false;
				// console.dir(this.nextElementSibling.classList);
				if (this.nextElementSibling.classList[0] === 'fav') {
					favStatus = true;
				}
				fetching('detail');
				detailsProperties(
					imgClickName,
					itemClickName,
					priceClickName,
					favStatus
				);
			}
		});
	});
}

function detailsProperties(imageName, itemName, itemPrice, favStatus) {
	console.log(imageName, itemName, itemPrice, favStatus);
	setTimeout(() => {
		const img = document.querySelector('.detailImg img');
		const name = document.querySelector('.detailNamePrice h2');
		const price = document.querySelector('.detailNamePrice h3');
      img.setAttribute('src', `${imageName}`)
      name.innerHTML = `${itemName}`
      price.innerHTML = `${itemPrice}`

      const backButton = document.querySelector('.pageId svg')
      backButton.addEventListener('click', function() {
         fetching('kerajinan')
      })
	}, 1000);
}
