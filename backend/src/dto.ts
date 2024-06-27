// dto.ts
export interface CreateEmailDTO {
  email: string;
  name?: string;
  amount?: number;
  comments?: string;
}

export interface UpdateEmailDTO {
  email?: string;
  name?: string;
  amount?: number;
  comments?: string;
}
