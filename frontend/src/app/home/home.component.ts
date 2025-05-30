import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any = [];
  searchText: string = '';
  productsTemp: any = [];
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getProducts().subscribe((item) => {
      this.products = item.products;
      this.productsTemp = item.products; // Store the original products for clearing search
    });
  }

  search() {
    this.apiService.searchProducts(this.searchText).subscribe((data: any) => {
      this.products = data.products;
    });
  }

  searchThroughKeys() {
    this.search();
  }

  clearSearch() {
    if (this.searchText == '') {
      this.products = this.productsTemp;
    }
  }
}
