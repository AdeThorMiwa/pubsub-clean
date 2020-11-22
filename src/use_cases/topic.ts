import { makeTopic } from "./../app/entities/topic";

/**
 * Class definition of all topic related use cases
 * @param storageService storage service that the topic needs to be saved.
 */  
class TopicUseCase {
  private storage: StorageService;
  private collection: string;

  constructor(storage: StorageService, collection: string) {
    this.storage = storage;
    this.collection = collection;
  }

  useStorage(storage: StorageService): TopicUseCase {
    this.storage = storage;
    return this;
  }

  useCollection(collection: string): TopicUseCase {
    this.collection = collection;
    return this
  }

  async create(_topic: TopicInterface): Promise<any> {
    const topic = await makeTopic(_topic)
    return await this.storage.store(this.collection, topic)
  }

  async findByTitle(title: string): Promise<TopicInterface | undefined> {
    return await this.storage.findOne(this.collection, { title })
  }

  async subscribe(_topic: TopicInterface, _subscription: Subscription): Promise<any> {
    const newSubscription = {
      subscriptions: [ ..._topic.subscriptions, _subscription ]
    }

    return await this.storage.findOneAndUpdate(
      this.collection, 
      _topic._id, 
      newSubscription
    );
  }

  async addEvent(_topic: TopicInterface, _event: TopicEvent): Promise<any> {
    const newEvent = {
      events: [ ..._topic.events, _event ]
    }
    
    return await this.storage.findOneAndUpdate(
      this.collection, 
      _topic._id, 
      newEvent
    );
  }

  async getAllSubscribersUrlOf(_topic: TopicInterface): Promise<string[]> {
    const topic: TopicInterface = await this.findByTitle(_topic.title);
    return topic.subscriptions.map(sub => sub.url)
  }
}

export default TopicUseCase;