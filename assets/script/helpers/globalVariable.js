let packageId = null;
let packageName = null;

module.exports = {
    getPackageId: () => { return packageId },
    setPackageId: (a) => { packageId = a },

    getPackageName: () => { return packageName },
    setPackageName: (b) => { packageName = b },

}