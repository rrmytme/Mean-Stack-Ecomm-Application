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
      // to do
    } else {
      this.cartItems.push(newCartItem);
    }

    // Update the BehaviorSubject with the new cart item
    this.itemsSource.next(this.cartItems);
  }
}
