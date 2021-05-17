interface Customer {
  name: string;
  phone: string;
  email: string;
  id: string;
  gender?: number;
  dial_code?: number;
  birth_date?: string;
  deleted_at?: string;
  last_order_at: string;
  house_account_limit?: number;
  house_account_balance?: number;
  is_loyalty_enabled?: boolean;
  is_blacklisted?: boolean;
  is_house_account_enabled?: boolean;
}
