import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../interfaces/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  @Input() product!:Product
  @Output() addToCartClick = new EventEmitter<Product>();
  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
    this.addToCartClick.emit(this.product);
  }
}
