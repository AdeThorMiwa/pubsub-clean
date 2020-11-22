import { Request, Response } from "express";
import dispatcher from "../../utils/dispatcher";
import { databaseService } from "./../../app/dependencies";
import catcher from "../../utils/catcher";
import TopicUseCase from "../../use_cases/topic";
import { InvalidParamsException, UnProcessableEntityException } from "./../../frameworks/error";

/**
 * Initialize topic collection
 */
const TopicCollection = new TopicUseCase(databaseService, "Topic");

/**
 * This controller handles publish an event to a topic
 * @param topic a `req.params` property of the topic to publish event to
 * @param message a `req.body` property of the message body of the event to be published
 */
export const publish = catcher(async (req: Request, res: Response, next: any) => {
    /**
     * get topic if exist
     */
    let topic: TopicInterface = await TopicCollection.findByTitle(req.params.topic)

    /**
     * if topic doesn't exist
     */
    if(!topic) {

        /**
         * return a topic not found exception
         */
        return next(
            new UnProcessableEntityException(`Topic \`${req.params.topic}\` does not exist`)
        )
    }

    /**
     * if it exist or has been created
     * check if there's a `req.body.message`
     */
    if(!req.body.message) {

        /**
         * return a invalid param exception
         */
        return next(new InvalidParamsException(`Message cannot be empty.`))
    }

    /**
     * create new event
     */
    const event: TopicEvent = {
        message: req.body.message,
        topic: topic._id
    }

    /**
     * add event to topic's event list
     */
    await TopicCollection.addEvent(topic, event)

    /**
     * dispatch Event to all subscribers
     * get all topic's subscribers
     */
    const subscribersUrl: string[] = await TopicCollection.getAllSubscribersUrlOf(topic);

    /**
     * dispatch event
     */
    subscribersUrl.forEach(
        (url: string) => dispatcher(url, event)
    )

    /**
     * return a success status
     */
    res.status(201).json({
        status: "success",
    })
})