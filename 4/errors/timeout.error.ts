export default class TimeOutError extends Error {
    constructor(...args) {
        super(...args);
        this.message = "TimeOut Error";
    }
}
