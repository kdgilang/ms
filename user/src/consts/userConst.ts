// REGEX
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// ERROR MESSAGES
export const EMAIL_ERROR_MESSAGE = 'Invalid email address.'
export const PASSWORD_ERROR_MESSAGE = 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8, max 20 char long.'

// env
export const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR) || 102928
export const PORT = process.env.PORT || 3000
export const DB_HOST: string = process.env.DB_HOST || ''