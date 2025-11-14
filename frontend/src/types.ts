export interface Travel {
id: number;
  destination: string;
  days: number;
  travelers: number;
  transport: string;        
  lodging: string;          
  activities: string[];    
  budgetPerPerson: number;  
  totalBudget: number;      
  createdAt: string;  
}

export interface User {
    id: number;
  email: string;
  password: string; // hashed
  name?: string;
  role?: string;
  created_at?: string;
}


