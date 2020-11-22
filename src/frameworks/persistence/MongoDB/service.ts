import Models from "./models";

class MongoDBService implements StorageService {

    async store(_model: string, _entity: any) {
        return await Models[_model].create(_entity);
    }

    async find(_model:string, _options: any): Promise<any> {
        return await Models[_model].find(_options)
    }

    async findOne(_model: string, _options: any): Promise<any> {
        return await Models[_model].findOne(_options)
    }

    async findOneAndUpdate(_model: string, _id: any, _update: any): Promise<any> {
        return await Models[_model].findByIdAndUpdate(_id, _update, { new: true })
    }
}

export default MongoDBService;