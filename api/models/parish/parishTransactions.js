function addParishesTransaction(tx, parishes) {
    return tx.run(
        `
UNWIND $parishes as parish
MERGE (p:area:parish {Name: parish.name})
return p as parish
`, { parishes },
    );
}

function getParishesTransaction(tx) {

}

module.exports = {
    addParishesTransaction,
    getParishTransaction,
    getParishesTransaction,
}