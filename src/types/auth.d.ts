export type AuthFormState = {
  status?: string,
  errors?: {
    name?: string[],
    username?: string[],
    password?: string[],
    confirmPassword?: string[],
    _form?: string[],
  }
}

export type backendResponseUser = {
  payload: {
    success: boolean,
    status: number,
    message: string,
    data: {
      result: {},
      token: string
    }
  }
}