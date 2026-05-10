export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export const ROLE_COLOR = {
  [Roles.ADMIN]: "blue",
  [Roles.MODERATOR]: "orange",
  [Roles.USER]: "purple",
};

export const FILTER_MAP = {
  allUsers: undefined,
  isBlockedUsers: true,
  activeUsers: false,
} as const;
