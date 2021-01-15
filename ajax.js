const container = document.querySelector('.container');

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
		// console.log('t')
	}

	xhr.open('GET', `./pages/${name}.html`);
	xhr.send();
}

fetching();

const icons = document.querySelectorAll('.icon');
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
         fetching(nameCard)
		});
	});
}
