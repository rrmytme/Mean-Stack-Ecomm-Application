import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  qty: number = 1; // Default quantity
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const productId: string = data['id'];
      this.apiService.getSingleProduct(productId).subscribe((data: any) => {
        this.product = data.product;
      });
    });
  }

  increaseQty() {
    if (this.qty == this.product.stock) {
      this.toastr.error('You cannot add more than available stock', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    this.qty++;
  }
  decreaseQty() {
    if (this.qty > 1) {
      this.qty--;
    }
  }

  addToCart() {
    if (this.qty > this.product.stock) {
      this.toastr.error('You cannot add more than available stock', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    const cartItem = {
      product: this.product,
      qty: this.qty,
    };
    this.cartService.addItem(cartItem);
    this.toastr.success('Item added to cart successfully!', 'Success',{
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
  }
}
