import { fetching } from '../ajax.js';

function getAllProfileElements() {

   function fetchingPesananPage(){
      const pesananEl = document.querySelector('.menu-one .pesanan')
      pesananEl.addEventListener('click', e => {
         fetching('pesanan')
      })
   }

   fetchingPesananPage()

}

export { getAllProfileElements };
