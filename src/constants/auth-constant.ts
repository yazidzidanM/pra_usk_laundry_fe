export const INITIAL_REGISTER_FORM = {
  nama: "",
  username: "",
  password: "",
  confirmPassword: "",
  success: false,
  data: ""
}

export const INITIAL_LOGIN_FORM = {
  username: "",
  password: "",
  success: false,
  data: ""
}

export type LoginState = {
  success: boolean;
  data: any | null;
  error: string | null;
  errors: {
    username: string[];
    password: string[];
  };
};


export const INITIAL_STATE_LOGIN_FORM = {
  success: false,
  data: null,
  error: null,
  errors: {
    username: [] as string[],
    password: [] as string[],
  }
}

export const INITIAL_STATE_REGISTER_FORM = {
  success: false,
  data: null,
  errors: {
    name: [] as string[],
    username: [] as string[],
    password: [] as string[],
    confirmPassword: [] as string[],
  }
}