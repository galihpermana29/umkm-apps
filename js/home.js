import { fetching } from '../ajax.js';

function getAllHomeElements(name) {
	const categoriCardElements = document.querySelectorAll('.card a');

	function fetchCategoryShopPage() {
		categoriCardElements.forEach((cardEl) => {
			cardEl.addEventListener('click', (e) => {
				let nameCard = cardEl.dataset.kategori;
				e.preventDefault();
				fetching(nameCard);
			});
		});
	}

	fetchCategoryShopPage();
}

export { getAllHomeElements };
