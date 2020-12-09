type LoginCredentials = {
  email: string;
  password: string;
}

type TokenResponse = {
  access?: string;
  refresh?: string;
  exp?: number,
  success: boolean,
  code: number
}
