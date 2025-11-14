export interface user {
  id: number;
  email: string;
  password: string; // hashed
  name?: string;
  role?: string;
  created_at?: string;
}