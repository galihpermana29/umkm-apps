import { fetching } from '../ajax.js';

function getAllProfileElements() {
	const tes = document.querySelector('.tes p');
	tes.addEventListener('click', (e) => {
		fetching('pesanan');
	});
}

export { getAllProfileElements };
