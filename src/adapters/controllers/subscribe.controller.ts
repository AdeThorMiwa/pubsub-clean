import { Request, Response } from "express";
import { databaseService } from "./../../app/dependencies";
import catcher from "../../utils/catcher";
import TopicUseCase from "../../use_cases/topic";
import { InvalidParamsException } from "./../../frameworks/error";

const TopicCollection = new TopicUseCase(databaseService, "Topic");

/**
 * This controller handles subscription to a topic
 * @param topic a `req.params` property of the topic to be subscribed to
 * @param url a `req.body` property of the url of subscribing server
 */
export const subscribe = catcher(async (req: Request, res: Response, next: any) => {
    /**
     * get topic if exist
     */
    let topic: TopicInterface = await TopicCollection.findByTitle(req.params.topic)

    /**
     * if topic doesn't exist
     */
    if(!topic) {

        /**
         * create new topic
         */
        topic = await TopicCollection.create({
            title: req.params.topic
        })
    }

    /**
     * if it exist or has been created
     * check if there's a `req.body.url`
     */
    if(!req.body.url) {

        /**
         * return a invalid param exception
         */
        return next(new InvalidParamsException(`Url cannot be empty.`))
    }

    /**
     * Newly created subscription
     */
    const subscription : Subscription = {
        url: req.body.url,
        topic: topic._id
    }

    /**
     * Subscribe
     */
    topic = await TopicCollection.subscribe(topic, subscription )
    // topic.subscribe(subscription)

    /**
     * return topic
     */
    res.status(201).json({
        status: "success",
        data: topic
    })
})