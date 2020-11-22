import joi from 'joi';

/**
 * Topic validation schema.
 */
export default joi.object().keys({
  title: joi.string().min(3).max(30).required(),
  subscriptions: joi.array().default([]),
  events: joi.array().default([])
});
