export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

export interface StrapiClientOptions {
  requiresAuth?: boolean;
  customToken?: string;
}

export interface PopulateOptions {
  [key: string]:
    | boolean
    | {
        fields?: string[];
        populate?: PopulateOptions;
      };
}
