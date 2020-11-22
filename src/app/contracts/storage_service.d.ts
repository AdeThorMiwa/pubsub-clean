declare interface StorageService {
    store(collection: string, entity: any): Promise<any>;
    find(collection: string, options: any): Promise<any[]>;
    findOne(collection: string, options: any): Promise<any>;
    findOneAndUpdate(collection: string, findOptions: any, updateEntity: any): Promise<any>;
}