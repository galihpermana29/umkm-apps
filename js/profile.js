import { fetching } from '../ajax.js';

function getAllProfileElements() {
	const backButton = document.querySelector('.profile svg');
	function fetchingPesananPage() {
		const pesananEl = document.querySelector('.menu-one .pesanan');

		pesananEl.addEventListener('click', (e) => {
			fetching('pesanan');
		});
   }
   function logoutPage(){
      const logoutEl = document.querySelector('.menu-one .keluar')
      logoutEl.addEventListener('click', e => {
         window.location.href = '/pages/Auth/'
      })
   }
	backButton.addEventListener('click', (e) => {
		fetching('home');
   });
   
   fetchingPesananPage();
   logoutPage()
}

export { getAllProfileElements };
