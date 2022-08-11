export interface CreateLinkDto {
  gid: string;
  name: string;
  timg: string;
  url: string;
  posn: number;
}

export type UpdateLinkDto = Partial<CreateLinkDto>;
