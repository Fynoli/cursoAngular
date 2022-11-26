import { Injectable } from '@angular/core';
import {Product} from "../interfaces/product.interface";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products : Product[] = []

  private cartSubject = new Subject<Product[]>();
  private totalSubject = new Subject<number>();
  private quantitySubject = new Subject<number>();

  get cartAction$() : Observable<Product[]>{
    return this.cartSubject.asObservable();
  }
  get quantiyAction$() : Observable<number>{
    return this.quantitySubject.asObservable();
  }
  get totalAction$() : Observable<number>{
    return this.totalSubject.asObservable();
  }

  updateCart(product:Product){
    this.addToCart(product);
    this.calcTotal();
    this.quantityProducts();
  }

  private addToCart(product:Product){
    this.products.push(product);
    this.cartSubject.next(this.products);
  }

  private quantityProducts(){
    this.quantitySubject.next(this.products.length);
  }

  private calcTotal(){
    const total = this.products.reduce((acum,prod)=>acum+=prod.price,0);
    this.totalSubject.next(total);
  }
}
