// import { fetching } from '../../ajax.js';

// import { fetching } from "../../ajax.js";

const daftarPhoneElements = document.querySelector('#second .phone');
const daftarButton = document.querySelector(' .daftarButton');
const daftarPasswordElements = document.querySelector('#second .password');
const daftarUsernameElements = document.querySelector('#second .username');
const masukButton = document.querySelector('.masukButton');

daftarButton.addEventListener('click', function (e) {
	let phone = daftarPhoneElements.value;
	let username = daftarUsernameElements.value;
	let password = daftarPasswordElements.value;
	if (phone === '' || username === '' || password === '') {
		alert('Pastikan semua data terisi');
		return;
	} else {
		let item = {
			phone: phone,
			username: username,
			password: password,
			online: false,
		};
		storeDataAuth(item);
		switchPage('daftar');
	}
});

masukButton.addEventListener('click', async function (e) {
	const masukPasswordElements = document.querySelector('#thirt .password');
	const masukPhoneElements = document.querySelector('#thirt .phone');
	const password = masukPasswordElements.value;
	const phone = masukPhoneElements.value;

	if (password === '' || phone === '') {
		alert('Pastikan semua data terisi');
		return;
	}

	let data = await readDataAuth(phone);
	if (data !== undefined) {
		if (data.phone === phone && data.password !== password) {
			alert('Password yang anda masukkan salah');
			masukPasswordElements.value = '';
			return;
		} else if (data.phone === phone && data.password === password) {
         data.online = true;
         storeDataAuth(data)
			window.location.pathname = '/umkm-apps/';
		}
		return;
	} else {
		alert('Data belum terdatar');
		return;
	}
});
