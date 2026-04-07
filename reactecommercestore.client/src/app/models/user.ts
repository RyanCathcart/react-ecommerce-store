export interface User {
  email: string;
  roles: string[];
}

export interface Address {
  name: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}