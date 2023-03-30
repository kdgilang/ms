import baseUserValidation from './baseUserValidation'

export default {
  // id: {
  //   // The location of the field, can be one or more of body, cookies, headers, params or query.
  //   // If omitted, all request locations will be checked
  //   in: ['params', 'query'],
  //   errorMessage: 'ID is wrong',
  //   isInt: true,
  //   // Sanitizers can go here as well
  //   toInt: true,
  // },
  ...baseUserValidation,
  firstName: {
    rtrim: {
      // Options as an array
      options: [' -'],
    },
  },
  lastName: {
    rtrim: {
      // Options as an array
      options: [' -'],
    },
  },
}
