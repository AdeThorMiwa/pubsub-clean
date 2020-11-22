import MemoryDB from "./frameworks/persistence/MemoryDB";
import mongoose from "mongoose"

const DBs: any = {
    mongo: (): void => {
        let DB;

        if (process.env.NODE_ENV !== "production") {
            DB = process.env.DATABASE_LOCAL;
        } else {
            DB = process.env.DATABASE.replace(
                "<PASSWORD>",
                process.env.DATABASE_PASSWORD
            );
        }

        mongoose
            .connect(DB, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            })
            .then(() => console.log("DB Connected Successfully!"));
    },
    memory: (): void => {
        MemoryDB.newCollection("Topic", {
            title: {
                type: "string",
                required: true,
            },
            subscriptions: {
                type: "array",
                default: []
            },
            events: {
                type: "array",
                default: []
            },
            methods: {
                /**
                 * Adds new `subscription` to current topic
                 * @param subscription a {@link Subscription} object to add to topics subscription list
                 */
                subscribe: function (subscription: Subscription): Subscription {
                    this.subscriptions = [...this.subscriptions, subscription];
                    return this.save();
                },
    
                /**
                 * Adds new `event` to current topic
                 * @param event a {@link TopicEvent} object to add to topics event list
                 */
                addEvent: function (event: TopicEvent): TopicEvent {
                    this.events = [...this.events, event];
                    return this.save()
                },
    
                /**
                 * Gets all subscriptions urls of current topic
                 */
                getAllSubscribersUrl: function (): string[] {
                    return this.subscriptions.map(({ url }: { url: string }): string => url)
                }
            }
        })
    }
}

export default (which: string = "memory"): void => DBs[which]()