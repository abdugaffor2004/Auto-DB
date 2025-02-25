
export interface Safety {
  id: string;
  crashTestingRating: number;
  airbagsCount: number;
  abs: boolean;
  esp: boolean;
  emergencyBreaking: boolean;
  adaptiveCruiseControl: boolean;
  // vehicle: Vehicle;
}
