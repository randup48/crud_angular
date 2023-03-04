export interface User {
  id?: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
}
