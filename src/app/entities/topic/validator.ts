import { Schema } from 'joi';
import { ErrorService } from "./../../../app/dependencies"

/**
 * Topic validator.
 * @param schema validation schema.
 */
export default (schema: Schema) => async (topic: TopicInterface): Promise<TopicInterface> => {
  const result = await schema.validateAsync(topic);
  if (result.error) throw new ErrorService("HTTP_ERROR_INVALID_ENTITY", 422, 1, result.error)

  return result;
};
