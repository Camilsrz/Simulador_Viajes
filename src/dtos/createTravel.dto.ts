export interface CreateTravelDTO {
  destination: string;
  days: number;
  travelers: number;
  transport: string;
  lodging: string;
  activities: string[];
  budgetPerPerson: number;
}
