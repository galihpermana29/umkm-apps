const container = document.querySelector('.container');
const icons = document.querySelectorAll('.icon');

function fetching(name) {
	let xhr = new XMLHttpRequest();
	// console.log(xhr);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				// console.log(this.response);
				// appendToBody(this.response);
				container.innerHTML = this.response;
				getKategoriElements();
			} else if (xhr.status !== 4) {
				console.log('eror brou');
			}
		}
	};

	// console.log(name)
	if (window.location.hash == '' && name === undefined) {
		name = 'home';
		console.log('t')
	}

	icons.forEach((icon) => {
		let i = icon.querySelector('svg');
		if (icon.dataset.name === name) {
			i.style.color = 'white';
		} else {
         i.style.color = '#9394d6'
		}
	});
	xhr.open('GET', `/pages/${name}.html`);
	xhr.send();
}

fetching();

// console.log(icons)
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
			// console.log(dataset);
			e.preventDefault();
			fetching(nameCard);
		});
	});
}
