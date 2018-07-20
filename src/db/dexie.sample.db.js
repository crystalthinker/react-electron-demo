import Dexie from 'dexie';

const db = new Dexie('weatherDB');
db.version(1).stores({
    city: `++id, name`
});

export default db;