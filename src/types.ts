export type Role = "ADMIN" | "USER" | "MODERATOR";

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export enum TodoStatus {
  ALL = "all",
  IN_WORK = "inWork",
  COMPLETED = "completed",
}

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface AuthData {
  login: string;
  password: string;
}

export interface RefreshServise {
  refreshToken: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileRequest {
  username: string;
  email: string;
  phoneNumber: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Role[];
  phoneNumber: string;
}
