let databases = async () => {
	let db = await idb.open('cart-items', 1, (upgradeDb) => {
		let matchObjectStore = upgradeDb.createObjectStore('cart', {
			keyPath: 'itemName',
			autoIncrement: true,
		});
		matchObjectStore.createIndex('itemName', 'itemName', { unique: false });
	});
	return db;
};



let storeData = async (item) => {
	let db = await databases();
	let tx = db.transaction('cart', 'readwrite');
	let store = tx.objectStore('cart');
	await store.put(item);
};

let readAllData = async () => {
	let db = await databases();
	let tx = db.transaction('cart', 'readwrite');
	let store = tx.objectStore('cart');
	let data = await store.getAll();
	return data;
};

let readData = async (item) => {
	let db = await databases();
	let tx = db.transaction('cart', 'readwrite');
	let store = tx.objectStore('cart');
	let data = await store.get(item);
	return data;
};

let deleteData = async (item) => {
	let db = await databases();
	let tx = db.transaction('cart', 'readwrite');
	let store = tx.objectStore('cart');
	let data = await store.delete(item);
	return data;
};
