import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "../../../shared/interfaces/store.interface";
import {Details, DetailsOrder, Order} from "../interfaces/order.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl='http://localhost:3000'

  constructor(private http: HttpClient){}

  getStores(): Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiUrl}/stores`)
  }

  saveOrder(order:Order): Observable<any>{
    return this.http.post<Order>(`${this.apiUrl}/orders`,order)
  }

  saveDetailsOrder(details: { orderId: any; details: Details[] }): Observable<DetailsOrder[]>{
    return this.http.post<DetailsOrder[]>(`${this.apiUrl}/detailsOrders`,details)
  }
}
