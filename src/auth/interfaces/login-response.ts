export interface ILoginResponse {
  user: IUser
  token: string;
}

interface IUser {
  id: string;
  name: string;
  password: string;
  rol: string[]
  email: string
}