export default class RetryError extends Error {
    constructor(...args) {
        super(...args);
        this.message = "Retry Error";
    }
}
