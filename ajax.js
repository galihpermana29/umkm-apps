import { getAllHomeElements } from './js/home.js';
import { getAllKerajinanElements } from './js/kerajinan.js';
import { getAllDetailElements } from './js/detail.js';
import { getAllCartElements } from './js/cart.js';
import { getAllPaymentElements } from './js/payment.js';
import { getAllPesananElements } from './js/pesanan.js';
import { getAllProfileElements } from './js/profile.js';
import { getAllInfoPesananElements } from './js/infoPesanan.js';


const container = document.querySelector('.container');
const icons = document.querySelectorAll('.icon');

function fetching(name, options, options2) {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				container.innerHTML = this.response;
				if (name === 'home') getAllHomeElements(name);
				if (name === 'kerajinan') getAllKerajinanElements(name);
				if (name === 'detail') getAllDetailElements(options);
				if (name === 'cart') getAllCartElements(options);
				if (name === 'payment') getAllPaymentElements(options, options2);
				if (name === 'pesanan') getAllPesananElements(options, options2);
				if (name === 'profile') getAllProfileElements(options, options2);
				if (name === 'infoPesanan')
					getAllInfoPesananElements(options);

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

function iconsOnClickAction() {
	const icons = document.querySelectorAll('.icon');
	icons.forEach((icon) => {
		icon.addEventListener('click', (e) => {
			let nameIcon = icon.dataset.name;
			fetching(nameIcon);
		});
	});
}

fetching();
iconsOnClickAction();

export { fetching };
