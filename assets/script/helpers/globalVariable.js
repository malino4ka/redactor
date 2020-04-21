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

    getKeyCount: () => { return key },
    setKeyCount: (k) => { key = k },

    getGateCount: () => { return gate },
    setGateCount: (g) => { gate = g },

    getStarsCount: () => { return star },
    setStarsCount: (s) => { star = star + s },

}