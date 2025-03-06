interface History {
  generation: number;
  startYear: number;
  endYear: number | null;
  unitsProduced: number | null;
  keyChanges: string[];
}

export interface VehicleCreate {
  brand: string;
  modelName: string;
  year: number;
  price: number;
  bodyType: string;
  history?: History;
  seatingCapacity: number;
  manufacturerId?: string;
  specificationId?: string;
}
