import BaseAppError from "./appError";

/**
 * Exception for requests with invalid parameters.
 */
export class InvalidParamsException extends BaseAppError {
    constructor(data: any) {
      super('HTTP_ERROR_INVALID_PARAMS', 400, 2, data);
    }
}
  
/**
 * Exception for entity not found error.
 */
export class UnProcessableEntityException extends BaseAppError {
    constructor(data: any) {
      super('HTTP_ERROR_ENTITY_NOT_FOUND', 422, 4, data);
    }
}

/**
 * Exception for entity validation error
 */
export class InvalidEntityException extends BaseAppError {
  constructor(data: any) {
    super("ENTITY_VALIDATION_ERROR", 400, 1, data);
  }
}

/**
 * Exception for internal server errors.
 */
export class InternalServerException extends BaseAppError {
    constructor(data: any) {
      super('HTTP_ERROR_DEFAULT', 500, 1, data);
    }
}

/**
 * Exception for contract methods that were not implemented.
 */
export class NotImplementedMethodException extends BaseAppError {
    constructor(data: any) {
        super('HTTP_ERROR_NOT_IMPLEMENTED_METHOD', 500, 2, data);
    }
}