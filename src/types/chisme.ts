import { Location } from "./location";
import { CreateProductDto } from "./product";

export type CreateChismeDto = {
  product: CreateProductDto;
  storeId?: number;
  location: Location;
  price?: number;
};
