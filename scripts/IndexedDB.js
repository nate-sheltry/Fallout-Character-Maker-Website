// Open or create a database
const dbName = "FalloutDatabase";
const dbVersion = 1;

const request = indexedDB.open(dbName, dbVersion);

function modifyDatabase(e, func){
    const db = e.target.result;
    func(db)
}

// Event handler for when the database is opened or created successfully
request.onsuccess = (event) => {
    const db = event.target.result;
    console.log(`Database "${dbName}" opened successfully`);

    // Perform database operations here

    // Don't forget to close the database when done
    db.close();
};

// Event handler for when the database needs to be upgraded (first time creation or version change)
request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create an object store (like a table in relational databases)
    const character = db.createObjectStore("character", { keyPath: "C00FA234", autoIncrement: true });

    // Define indexes if needed
    // objectStore.createIndex("indexName", "propertyName", { unique: false });

    console.log(`Object store "MyObjectStore" created successfully`);
};

// Event handler for errors during database operations
request.onerror = (event) => {
    console.error(`Error opening database "${dbName}":`, event.target.error);
};

// Event handler for when the database version is less than the specified version
request.onblocked = (event) => {
    console.warn(`The database "${dbName}" version is lower than the specified version. Please close other tabs.`);
};
