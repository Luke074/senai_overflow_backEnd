const { celebrate, Segments, Joi } = require("celebrate");

module.exports = {
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            ra: Joi.string().length(7).pattern(/^[0-9]+$/).required(),
            name: Joi.string().required().min(3).max(255),
            email: Joi.string().required().email().min(8).max(255),
            password: Joi.string().required().min(6),
        }),
    }),
};