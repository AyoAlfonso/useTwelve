// dto.ts
export interface CreateEmailDTO {
  email: string;
  messageId: string;
  name?: string;
  amount?: number;
  comments?: string;
}

export interface UpdateEmailDTO {
  amount?: number;
  comments?: string;
}
