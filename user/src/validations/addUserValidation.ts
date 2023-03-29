import { 
  PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE
} from '../consts/authConst'

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
  email: {
    errorMessage: EMAIL_ERROR_MESSAGE,
    isEmail: {
      bail: true,
    },
  },
  password: {
    custom: {
      errorMessage: PASSWORD_ERROR_MESSAGE,
      options: (value: string) => {
        if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
          return true
        }
        return false
      },
    },
  },
}
