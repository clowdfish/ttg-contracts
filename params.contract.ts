/**
 * The information needed to reset the password.
 */
interface ResetInformation {
  resetToken: string;
  newPassword: string;
}

/**
 * The information to identify a user.
 */
interface Identity {
  email: string;
}

/**
 * Login information for the user.
 */
interface LoginInformation {
  email: string;
  password: string;
}


/**
 * SignUp information for the user.
 */
interface SignUpInformation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}