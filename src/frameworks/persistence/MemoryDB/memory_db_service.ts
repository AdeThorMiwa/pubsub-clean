import MemoryDB from ".";

class MemoryDBService implements StorageService {
    private storage: MemoryDBInterface;

    constructor() {
        this.storage = MemoryDB;
    }

    async store(_collection: string, _entity: any) {
        const collection: CollectionInterface = this.storage.collection(_collection);
        return collection.createOne(_entity)
    }

    async find(_collection:string, _options: any): Promise<any> {
        const collection: CollectionInterface = this.storage.collection(_collection);
        return collection.getAll(_options)
    }

    async findOne(_collection: string, _options: any): Promise<any> {
        const collection: CollectionInterface = this.storage.collection(_collection);
        return collection.getAll(_options)[0] || undefined
    }

    async findOneAndUpdate(_collection: string, _id: any, _update: any): Promise<any> {
        const collection: CollectionInterface = this.storage.collection(_collection);
        return collection.updateOne(_id, _update)
    }

}

export default MemoryDBService;