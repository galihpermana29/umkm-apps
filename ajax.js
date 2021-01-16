const container = document.querySelector('.container');
const icons = document.querySelectorAll('.icon');
const imageName = [
	{
		imageName: 'kursi_estetik',
		itemName: 'Kursi Minimalis',
		priceItem: 200,
		descItem:
			'Merupakan kursi minimalis yang bisa digunakan di segala tempat. Kursi ini dibuat dengan menggunakan kayu yang berkualitas tinggi. Kursi ini sangat cocok bagi kalian yang ingin mempunyai rumah dengan view yang simple tetapi elegan',
	},
	{
		imageName: 'lampu-belajar',
		itemName: 'Lampu Belajar',
		priceItem: 180,
		descItem:
			'Lampu belajar ini mempunyai pencahayaan yang pas untuk belajar di malam hari, bobotnya yang ringan juga membuat lampu belajar ini bisa di bawa kemana saja dan di pindahkan dimana saja.',
	},
	{
		imageName: 'jam',
		itemName: 'Jam Dinding',
		priceItem: 70,
		descItem:
			'Jam dinding kayu yang dibuat dengan kayu mahoni dengan konsep simple. Cocok untuk rumah yang ingin memliki nuansa kayu dan elegan.',
	},
	{
		imageName: 'meja_cafe',
		itemName: 'Meja Kafe',
		priceItem: 100,
		descItem:
			'Merupakan meja yang bisa digunakan di segala tempat. Kursi ini dibuat dengan menggunakan kayu yang berkualitas tinggi. Meja ini sangat cocok bagi kalian yang ingin mempunyai rumah dengan view yang bebas dan santai',
	},
	{
		imageName: 'phone_holder',
		itemName: 'Penyanggah Hp',
		priceItem: 50,
		descItem:
			'Penyanggah hp yang bisa digunakan sebagai sandaran hp kamu ketika ingin menonton film, konferensi zoom, atau mengecas. Dibuat menggunakan kayu bakau, sehingga sangat kuat dan pas untuk tipe hp apapun',
	},
	{
		imageName: 'tempat_pisau',
		itemName: 'Tempat Pisau',
		priceItem: 40,
		descItem:
			'Letakkan pisau dapurmu pada tempat yang sesuai, ini memudahkan kamu dalam mengambil dan mencari nya. Tempat pisau ini di desain agar pengguna tidak bingung menyimpan pisaunya.',
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
      setTimeout(() => {
         
      }, 1000);
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
		});
	});

	const cardItems = document.querySelectorAll('.cardItems');
	cardItems.forEach(function (item) {
		item.addEventListener('click', function (e) {
			if (this.className === 'cardItems') {
				const imgClickName = this.children[0].attributes[0].value;
				const itemClickName = this.children[1].children[0].textContent;
				const priceClickName = this.children[1].children[1].textContent;
				let favStatus = false;
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

function detailsProperties(imgName, itemName, itemPrice, favStatus) {
	setTimeout(() => {
		const img = document.querySelector('.detailImg img');
		const name = document.querySelector('.detailNamePrice h2');
		const price = document.querySelector('.detailNamePrice h3');
		const desc = document.querySelector('.detailDesc p');
		img.setAttribute('src', `${imgName}`);
		name.innerHTML = `${itemName}`;
		price.innerHTML = `${itemPrice}`;

		for (let i = 0; i < imageName.length; i++) {
			if (name.textContent === imageName[i].itemName) {
				desc.innerHTML = `${imageName[i].descItem}`;
			}
		}

		const backButton = document.querySelector('.pageId svg');
		backButton.addEventListener('click', function () {
			fetching('kerajinan');
		});

		const minButton = document.querySelector('.kurang');
		const addButton = document.querySelector('.tambah');
      const qInput = document.querySelector('.quantity input');
      const addToCartButton = document.querySelector('.addToCartButton')
		// console.dir(qValue)
      addMinButtonEl(minButton, addButton, qInput);
      getAddToCartButtonEl(addToCartButton)
	}, 1000);
}

function addMinButtonEl(minButton, addButton, qInput) {
	let val = parseInt(qInput.value);
	addButton.addEventListener('click', (e) => {
      val += 1;
		qInput.value = `${val}`
   });
   
   minButton.addEventListener('click', (e) => {
      if(val === 1) return;
      val -= 1;
      qInput.value = `${val}`
   })
}

function getAddToCartButtonEl(buttonEl) { 
   buttonEl.addEventListener('click', function(e){
      const imgCart = this.parentElement.parentElement.children[0].children[0].getAttribute('src')
      const nameCart = this.parentElement.parentElement.children[1].children[0].textContent
      const priceCart = this.parentElement.parentElement.children[1].children[1].textContent
      // console.log(imgCart, nameCart, priceCart )
   })
}