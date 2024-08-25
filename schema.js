const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().uri().allow(''), // Allow an empty string
            filename: Joi.string().allow('') // Allow an empty string
        }).optional() // Make the image object optional
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required()
    }).required()
});