// types/travel.ts
export interface Option {
  title: string;
  price: number;
  image: string;
}

export interface TravelPayload {
  destination: string;
  days: number;
  travelers: number;
  transport: string;
  lodging: string;
  activities: string[];
  budgetPerPerson: number;
  totalBudget: number;
}

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

// types/user.ts
export interface User {
  id: number;
  email: string;
  password: string; // hashed
  name?: string;
  role?: string;
  created_at?: string;
}


