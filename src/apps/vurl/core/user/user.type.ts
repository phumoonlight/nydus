export interface CreateUserDto {
  username: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export enum LoginType {
  Guest = 0,
  Google = 1,
}

export interface LoginDto {
  type: LoginType;
  token?: string;
}
