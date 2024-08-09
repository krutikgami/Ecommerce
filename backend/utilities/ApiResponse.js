class ApiResponse {
    constructor(status, message = "success", data) {
        this.data = data;
        this.status = status;
        this.message = message;
        this.success = true;
    }
}
export {ApiResponse};