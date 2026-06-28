export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_two_factor_enabled?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "LOST";
  assignedTo: string;
  custom_fields?: Record<string, unknown>;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  status: string;
  leadId: string;
  assignedTo: string;
}
