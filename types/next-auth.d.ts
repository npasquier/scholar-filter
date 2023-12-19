import "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    sessionToken: string;
    userId: string;
  }
}
