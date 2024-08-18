export class ApiResponse {
    constructor (statusCode, payload, message) {
        this.statusCode = statusCode;
        this.payload = payload;
        this.message = message;
        this.success = statusCode < 400;
    }
}