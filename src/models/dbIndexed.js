const dbName = 'musicPlayerDB';
const dbVersion = 1;
let db;

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            const objectStore = db.createObjectStore('songs', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('title', 'title', { unique: false });
            objectStore.createIndex('albumTitle', 'albumTitle', { unique: false });
            objectStore.createIndex('artistName', 'artistName', { unique: false });
            objectStore.createIndex('mp3File', 'mp3File', { unique: false });
            objectStore.createIndex('coverUrl', 'coverUrl', { unique: false });
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const addSong = (song) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['songs'], 'readwrite');
        const objectStore = transaction.objectStore('songs');
        const request = objectStore.add(song);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const getSong = (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['songs'], 'readonly');
        const objectStore = transaction.objectStore('songs');
        const request = objectStore.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const updateSong = (id, updatedSong) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['songs'], 'readwrite');
        const objectStore = transaction.objectStore('songs');
        const request = objectStore.put({ ...updatedSong, id });

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const deleteSong = (id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['songs'], 'readwrite');
        const objectStore = transaction.objectStore('songs');
        const request = objectStore.delete(id);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const getAllSongs = () => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['songs'], 'readonly');
        const objectStore = transaction.objectStore('songs');
        const request = objectStore.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export { openDB, addSong, getSong, updateSong, deleteSong, getAllSongs };