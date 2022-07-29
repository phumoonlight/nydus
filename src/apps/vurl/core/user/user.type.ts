export interface CreateUserDto {
  username: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;
