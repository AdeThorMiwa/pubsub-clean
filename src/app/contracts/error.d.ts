/**
 * Interface can only implemented.
 */
declare interface ErrorInterface {
    status: string
    statusCode: number
    errorCode: number
    message: string
    data: any,
    isOperational?: boolean
}