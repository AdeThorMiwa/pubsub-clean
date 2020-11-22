class AppError extends Error implements ErrorInterface  {
  public status: string;
  public statusCode: number;
  public errorCode: number;
  public message: string;
  public data: any;
  public isOperational: boolean;

  constructor(
      message: string,
      statusCode: number, 
      errorCode: number, 
      data: any = null
  ) {
      super(message)
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.message = message;
      this.data = data;
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;