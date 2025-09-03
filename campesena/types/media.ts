import { User } from "./user";
import { Pagination } from "./pagination";

export interface Related {
  id: number;
  documentId: string;
}

export interface FolderRequest {
  name: string;
  pathId?: number;
  parent?: number | string;
  children?: (number | string)[];
  files?: any[];
  path: string;
  locale?: string;
}

export interface Folder {
  id: number;
  documentId: string;
  name: string;
  pathId: number;
  parent: { data: Folder };
  children: { data: Folder[] };
  files: any[];
  path: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Folder[] };
}

export interface Folders {
  data: Folder[];
  meta: {
    pagination: Pagination;
  };
}

export interface Media {
  data: MediaData;
}

export interface MediaData {
  id: number;
  attributes: MediaAttributes;
}

export interface MediaAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  folderPath: string;
  folder: { data: Folder };
  related: { data: Related[] };
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  localizations: { data: any[] };
}