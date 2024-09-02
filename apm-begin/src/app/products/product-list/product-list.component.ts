import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { EMPTY, catchError } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent, AsyncPipe]
})
export class ProductListComponent{
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';


  products$ = this.productSvc.products$
  .pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private productSvc: ProductService) {        
  }

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;    
    console.log("This was clicked", productId)
  }
}
