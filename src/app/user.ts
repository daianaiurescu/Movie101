export interface Roles {
  User?: boolean;
  Admin?: boolean;
}
export interface User {
  uid: string;
  Email: string;
  Role: Roles;
}
