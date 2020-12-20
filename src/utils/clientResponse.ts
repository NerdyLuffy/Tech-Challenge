class ClientResponse {
  constructor(
    public message?: Object,
    public status?: number,
    public isSuccessful?: Boolean
  ) {}

  public setError(message: object, status: number): void {
    this.message = message;
    this.status = status;
    this.isSuccessful = false;
  }

  public successResponse(message: object): void {
    this.message = message;
    this.status = 200;
    this.isSuccessful = true;
  }

  public worked() {
    return this.isSuccessful === true;
  }
}

export default ClientResponse;
