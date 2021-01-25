let databases = async () => {
	let db = await idb.open('auth-db', 1, (upgradeDb) => {
		let matchObjectStore = upgradeDb.createObjectStore('auth', {
			keyPath: 'phone',
			autoIncrement: true,
		});
		matchObjectStore.createIndex('phone', 'phone', { unique: false });
	});
	return db;
};


let storeDataAuth = async (item) => {
	let db = await databases();
	let tx = db.transaction('auth', 'readwrite');
	let store = tx.objectStore('auth');
	await store.put(item);
};

let readAllDataAuth = async () => {
	let db = await databases();
	let tx = db.transaction('auth', 'readwrite');
	let store = tx.objectStore('auth');
	let data = await store.getAll();
	return data;
};

let readDataAuth = async (item) => {
	let db = await databases();
	let tx = db.transaction('auth', 'readwrite');
	let store = tx.objectStore('auth');
	let data = await store.get(item);
	return data;
};

let deleteDataAuth = async (item) => {
	let db = await databases();
	let tx = db.transaction('auth', 'readwrite');
	let store = tx.objectStore('auth');
	let data = await store.delete(item);
	return data;
};
