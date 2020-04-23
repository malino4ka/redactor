let packageId = null;
let packageName = null;
let userData = null;

let key = 0;
let gate = 0;
let star = 0;

module.exports = {
    getPackageId: () => { return packageId },
    setPackageId: (a) => { packageId = a },

    getPackageName: () => { return packageName },
    setPackageName: (b) => { packageName = b },

    getUserData: () => {
        userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        if (userData === null) {
            return {};
        }
        return userData;
    },
    setUserData: (b) => {
        cc.sys.localStorage.setItem('userData', JSON.stringify(b));
    },
    setKeyCount: (k) => { key = k },
    getKeyCount: () => { return key },
    addKeyCount: () => { key++ },
    removeKeyCount: () => { key-- },
    resetKeyCount: () => { key = 0 },

    setGatesCount: (g) => { gate = g },
    getGateCount: () => { return gate },
    addGateCount: () => { gate++ },
    removeGateCount: () => { gate-- },
    resetGateCount: () => { gate = 0 },

    setStarsCount: (s) => { star = s },
    getStarsCount: () => { return star },
    starsCountIncrement: () => { star++ },
    starsCountDecrement: () => { star-- },
    starsCountReset: () => { star = 0 },

}