const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
    let errors = {}
    
    data.company = !isEmpty(data.company) ? data.company : '' 
    data.position = !isEmpty(data.position) ? data.position : '' 
    data.location = !isEmpty(data.location) ? data.location : '' 
    data.description = !isEmpty(data.description) ? data.description : '' 
    data.tags = !isEmpty(data.tags) ? data.tags : '' 

    if(Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required'
    }

    if(Validator.isEmpty(data.position)) {
        errors.position = 'Position field is required'
    }

    if(Validator.isEmpty(data.location)) {
        errors.location = 'Location field is required'
    }

    if(Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required'
    }

    if(Validator.isEmpty(data.tags)) {
        errors.tags = 'Tags field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}