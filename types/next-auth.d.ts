import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session types with custom session fields.
   */
  interface Session {
    id: string;
    sessionToken: string;
    userId: string;
  }
}
