import { Injectable } from "@angular/core";
import { Product } from './product';

@Injectable()
export class ProductService {


 getProductList(): Product[] {
  return [
   { id: 1, Name: 'book' },
   { id: 2, Name: 'pen' },
   { id: 3, Name: 'rubber' },
   { id: 4, Name: 'ruler' }
  ];
 }

}
