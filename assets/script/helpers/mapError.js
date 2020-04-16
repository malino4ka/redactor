let errorMessage = null;

module.exports = {
    getErrorMessage :()=>{return errorMessage},
    setErrorMessage :(a)=>{errorMessage = a},
}