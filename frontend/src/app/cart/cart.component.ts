import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  cartCount: number = 0;
  subtotal: number = 0;
  estTotal: number = 0;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data: any) => {
      this.cartItems = data; // Subscribe to cart items
    });
    this.calculateCartItems();
  }

  calculateCartItems() {
    this.cartCount = this.cartItems.length; // Initialize cart count based on items in the cart
    this.subtotal = this.cartItems.reduce((acc: any, item: any) => {
      return acc + item.qty; // Calculate subtotal
    }, 0);
    this.estTotal = this.cartItems.reduce((acc: any, item: any) => {
      return acc + item.product.price * item.qty; // Calculate esttotal
    }, 0);
  }

  remooveItem(productId: string) {
    const prevCartItem: any = this.cartItems.find(
      (item: any) => item.product._id == productId
    );
    if (prevCartItem) {
      const filteredItems = this.cartItems.filter(
        (item: any) => item.product._id != productId
      );
      this.cartService.updateCartItem(filteredItems); // Update cart items in the service
    }
    this.calculateCartItems();
  }

  decreaseQty(productId: string) {
    const prevCartItem: any = this.cartItems.find(
      (item: any) => item.product._id == productId
    );
    let qty = prevCartItem.qty;
    if (qty == 1) return; // Prevent decreasing quantity below 1
    qty--; // Decrease quantity

    this.cartItems = this.cartItems.map((item: any) => {
      if (item.product._id == prevCartItem.product._id) {
        item.qty = qty; // Update quantity in the cart item
      }
      return item;
    });
    this.cartService.updateCartItem(this.cartItems); // Update cart items in the service
    this.calculateCartItems(); // Recalculate cart items
  }

  increaseQty(productId: string) {
    const prevCartItem: any = this.cartItems.find(
      (item: any) => item.product._id == productId
    );
    let qty = prevCartItem.qty;
    if (qty == prevCartItem.product.stock) return; // Prevent decreasing quantity below 1
    qty++; // Decrease quantity
    this.cartItems = this.cartItems.map((item: any) => {
      if (item.product._id == prevCartItem.product._id) {
        item.qty = qty; // Update quantity in the cart item
      }
      return item;
    });
    this.cartService.updateCartItem(this.cartItems); // Update cart items in the service
    this.calculateCartItems(); // Recalculate cart items
  }

  orderComplete() {
    this.apiService.orderComplete(this.cartItems).subscribe((data: any) => {
      if (data.success) {
        const orderId = data.order._id;

        this.router.navigate(['order', 'success', orderId]); // Navigate to order success page with order ID
        this.cartService.updateCartItem([]); // Clear cart items after successful order
      }
    });
  }
}
