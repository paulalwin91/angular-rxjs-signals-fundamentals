import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgIf, NgFor, NgClass } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, Subscription, catchError } from 'rxjs';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent]
})
export class ProductListComponent implements OnInit, OnDestroy{
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';


  // Products
  products: Product[] = [];
  prodSub!: Subscription
  constructor(private productSvc: ProductService) {
        
  }


  ngOnInit(){
    this.prodSub = this.productSvc.getProducts()
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )   
    .subscribe({
      next: products => {
        this.products = products 
        console.log(this.products)
      }      
    })
    
  }

  ngOnDestroy(){
    this.prodSub.unsubscribe()
  }

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;    
    console.log("This was clicked", productId)
  }
}
