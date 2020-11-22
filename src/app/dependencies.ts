import DatabaseService from "../frameworks/persistence/MongoDB";

export const databaseService: StorageService = new DatabaseService();
export { default as ErrorService } from "./../frameworks/error/appError"