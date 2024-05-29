const sqlite3 = require('sqlite3');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const db = new sqlite3.Database('boutique.db');

function createAccount(nom, prenom, mail) {
    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO compte (nom, prenom, mail) VALUES (?, ?, ?)');
        stmt.run(nom, prenom, mail, (err) => {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log('Compte créé avec succès !');
            rl.close();
        });
        stmt.finalize();
    });
}

rl.question('Nom : ', (nom) => {
    rl.question('Prénom : ', (prenom) => {
        rl.question('Mail : ', (mail) => {
            createAccount(nom, prenom, mail);
        });
    });
});
