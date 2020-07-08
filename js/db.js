// import idb from './idb.js';

var dbPromised = idb.open("football", 1, upgradeDb => {
    var articlesObjectStore = upgradeDb.createObjectStore("matches");
    articlesObjectStore.createIndex("competition.name", "competition.name", { unique: false });
});

const saveAllForLater = matches => {
    if(matches) {
        dbPromised
        .then(db => {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            // store.add(article.result);
            store.clear();
            matches.matches.forEach(match => {
                store.add(match, match.id)
            })
            return tx.complete;
        })
        .then(() => {
            console.log("Matches berhasil disimpan.");
        });
    }
}

const saveForLater = match => {
    if(match) {
        dbPromised
        .then(db => {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            store.add(match, match.id);
            return tx.complete;
        })
        .then(() => {
            console.log("Match berhasil disimpan.");
        });
    }
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.getAll();
            })
            .then(matches => {
                resolve(matches);
            });
        });
}

const deleteMatch = (id) => {
    console.log('delete match')
    if(id) {
        dbPromised
        .then(db => {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            console.log("Match berhasil dihapus.");
        });
    }
}

const deleteAllMatches = (matches) => {
    console.log('delete all match')
    if(matches) {
        dbPromised
        .then(db => {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            store.clear();
            return tx.complete;
        })
        .then(() => {
            console.log("Matches berhasil dihapus.");
        });
    }
}