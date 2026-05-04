export const ROLE_COLOR = {
  admin: "blue",
  user: "purple",
  moderator: "orange",
};

export const FILTER_MAP = {
  allUsers: undefined,
  isBlockedUsers: true,
  activeUsers: false,
} as const;

export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}
