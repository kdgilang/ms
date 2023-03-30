import { 
  PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_REGEX
} from '../consts/userConst'
  
export default {
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
        if (value.match(PASSWORD_REGEX)) {
          return true
        }
        return false
      },
    },
  },
}
  