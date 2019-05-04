
import {
  Component, OnInit
} from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  providers: [ProductService]
})
export class ShowComponent implements OnInit {
  check = 'good';
  show: string;
  productList: Product[];
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.productList = this.productService.getProductList();
  }

  getData() {
  }









}
