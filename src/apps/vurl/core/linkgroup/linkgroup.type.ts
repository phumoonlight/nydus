export interface CreateLinkGroupDto {
  name: string;
  desc: string;
  timg: string;
  posn: number;
  public: boolean;
}

export type UpdateLinkGroupDto = Partial<CreateLinkGroupDto>;
