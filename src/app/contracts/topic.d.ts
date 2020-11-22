declare interface TopicInterface {
    _id?: any;
    title: string,
    subscriptions?: Subscription[]
    events?: TopicEvent[]
}