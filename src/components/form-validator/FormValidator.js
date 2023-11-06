const FormValidator = (values) => {
  const errors = {}

  const validateField = (fieldName, value, validationFn) => {
    if (!value || value.trim() === '') {
      errors[fieldName] = `${fieldName} is required`
    } else {
      const fieldError = validationFn(value)
      if (fieldError) {
        errors[fieldName] = fieldError
      }
    }
  }

  validateField('FirstName', values.FirstName, (value) => {
    if (value[0].toUpperCase() !== value[0]) {
      return 'First name should start with an uppercase letter'
    }
    if (value.trim() === '') {
      return 'First name is required'
    }
    return null
  })

  validateField('LastName', values.LastName, (value) => {
    if (value[0].toUpperCase() !== value[0]) {
      return 'Last name should start with an uppercase letter'
    }
    return null
  })

  validateField('Address', values.Address, (value) => null)

  validateField('Email', values.Email, (value) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Invalid email address'
    }
    return null
  })

  validateField('MobilePhone', values.MobilePhone, (value) => {
    if (!/^[0-9]+$/.test(value) || value.length < 11) {
      return 'Mobile Phone must have at least 11 digits'
    }
    return null
  })

  validateField('City', values.City, (value) => null)

  validateField('Country', values.Country, (value) => null)

  return errors
}

export default FormValidator
