export interface Team {
  _id: string;
  name: string;
  description?: string;
  agents?: Agent[];
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Technician' | 'Agent';
  team: Team | string;
  active?: boolean;
  avatarUrl?: string;
  createdAt?: string;
}
