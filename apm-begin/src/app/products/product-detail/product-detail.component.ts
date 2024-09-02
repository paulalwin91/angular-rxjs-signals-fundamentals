import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { EMPTY, Subscription, catchError, concatMap, map, switchMap, tap } from 'rxjs';
import { ReviewService } from 'src/app/reviews/review.service';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  // Just enough here for the template to compile
  @Input() productId: number = 0;
  errorMessage = '';

  constructor(private prodSvc: ProductService, private reviewSvc: ReviewService) {
    
  }
  // Product to display
  product: Product | null = null;

  prodSub! : Subscription
  

  ngOnChanges(): void {    
    if(this.productId)
      this.prodSub =this.prodSvc.getProduct(this.productId).pipe(              
              catchError(err => {
                this.errorMessage = err;
                return EMPTY
              })
          ).subscribe(
          prod => {
           this.product = prod
            })
          }
        
  

  ngOnDestroy(): void {
    if(this.prodSub)
      this.prodSub.unsubscribe();    
  }
  
  // Set the page title
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  addToCart(product: Product) {
  }
}
