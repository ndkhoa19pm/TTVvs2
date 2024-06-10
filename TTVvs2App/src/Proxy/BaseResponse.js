class BaseResponse {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
export { BaseResponse };
