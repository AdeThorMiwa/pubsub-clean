/**
 * Collection Document (single) interface.
 */
declare interface Doc {
    _id: string;
    name?: string;
    update(_data: any): Doc;
    save(): void;
    methods?: any;
    timestamp: Date
}

/**
 * Collection interface.
 */
declare interface CollectionInterface {
    name: string;
    schema: object | any;

    getAll(_options: any): Doc[]
    getOne(_id: string): Doc | undefined;
    getByName(_name: string): Doc | undefined 
    createOne(_data: any): object 
    updateOne(_id: string, _data: any): Doc
    _isInternals(_attribute: string): boolean
    _loadInternals(_internalKey: string, _internals: object): object
    _loadInternalMethods(_methods: any): object
    _validateSchema( _schemaProp: string, _schemaValue: any ): any 
    _validateSchemaRule(_schemaRule: string, _ruleValue: any, value: any): boolean | any
    _validateType(value: any, _ruleValue: string): boolean
}

declare interface MemoryDBInterface {
    newCollection(_name: string, _schema: object): CollectionInterface
    collection(_name: string): CollectionInterface | undefined
    getCollections(): CollectionInterface[]
}