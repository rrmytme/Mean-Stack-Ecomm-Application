import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  searchText: string = '';
  cartCount: number = 0;

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data: any) => {
      this.cartCount = data.length; // Update cart count based on current items
    });
  }

  search() {
    this.apiService.searchProducts(this.searchText);
  }

  searchThroughKeys() {
    this.search();
  }

  clearSearch() {
    this.apiService.clearSearch(this.searchText);
  }
}
