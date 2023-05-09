export enum ErrorMessages {
  INVALID_CREDENTIALS = 'Invalid credentials',
  SERVER_ERROR = 'Something went wrong. Please try again later',
  USER_EXISTS = 'User already exists',
  USER_NOT_FOUND = 'User not found',
  ALREADY_ADMIN = 'User is already an admin',
}

export enum SuccessMessages {
  USER_CREATED = 'User created',
  LOGIN_SUCCESSFUL = 'Login successful',
  USER_GRANTED_ADMIN = 'User granted admin access',
}
