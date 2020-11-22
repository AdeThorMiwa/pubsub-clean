import topicValidator from "./validator";
import Schema from "./schema";

const validator = topicValidator(Schema);

/**
 * Topic builder, validate and build a {@link TopicInterface} object.
 * @param topic topic object.
 */
export const makeTopic = async (topic: TopicInterface): Promise<TopicInterface> => await validator(topic);