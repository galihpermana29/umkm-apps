let databasesP = async () => {
	let db = await idb.open('pesanan-db', 1, (upgradeDb) => {
		let matchObjectStore = upgradeDb.createObjectStore('pesanan', {
			keyPath: 'orderID',
			autoIncrement: true,
		});
		matchObjectStore.createIndex('orderID', 'orderID', { unique: false });
	});
	return db;
};



let storeDataP = async (item) => {
	let db = await databasesP();
	let tx = db.transaction('pesanan', 'readwrite');
	let store = tx.objectStore('pesanan');
	await store.put(item);
};

let readAllDataP = async () => {
	let db = await databasesP();
	let tx = db.transaction('pesanan', 'readwrite');
	let store = tx.objectStore('pesanan');
	let data = await store.getAll();
	return data;
};

let readDataP = async (item) => {
	let db = await databasesP();
	let tx = db.transaction('pesanan', 'readwrite');
	let store = tx.objectStore('pesanan');
	let data = await store.get(item);
	return data;
};

let deleteDataP = async (item) => {
	let db = await databasesP();
	let tx = db.transaction('pesanan', 'readwrite');
	let store = tx.objectStore('pesanan');
	let data = await store.delete(item);
	return data;
};
