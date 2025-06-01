import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  itemsSource = new BehaviorSubject([]);
  currentItems = this.itemsSource.asObservable();
  cartItems: any = [];

  addItem(newCartItem: any) {
    // Check if the item already exists in the cart
    const prevCartItem = this.cartItems.find(
      (item: any) => item.product._id === newCartItem.product._id
    );

    if (prevCartItem) {
      this.cartItems = this.cartItems.map((item: any) => {
        if (item.product._id == newCartItem.product._id) {
          item.qty += newCartItem.qty; // Update no.of quantity if item exists
          return item;
        }
      });
    } else {
      this.cartItems.push(newCartItem);
    }

    // Update the BehaviorSubject with the new cart item
    this.itemsSource.next(this.cartItems);
  }

  updateCartItem(items: []) {
    this.cartItems = items;
    this.itemsSource.next(this.cartItems);
  }
}
