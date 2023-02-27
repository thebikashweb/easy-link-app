export type UrlPayloadType = {
  originalLink: string;
  name?: string;
  userId: string;
};

export type UrlType = {
  id?: string;
  urlCode: string;
  originalLink: string;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
  userId: string;
};
