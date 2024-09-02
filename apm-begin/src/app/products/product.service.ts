import { Injectable } from '@angular/core';
import {switchMap, Observable, catchError, filter, of, tap, throwError, map, shareReplay } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  products$ = this.http.get<Product[]>(this.productsUrl).pipe( 
    tap((x)=> console.log(x)),
    tap(()=> console.log("Before the cache replay")),
    shareReplay(1),
    tap(()=> console.log("After the cache replay")),
    catchError(err=> this.handleMySins(err))
  );

  constructor(private http : HttpClient, private errorSvc: HttpErrorService, private reviewSvc: ReviewService ) {        
  }
    
  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.productsUrl + '/' + id).pipe(      
      switchMap(prd => this.getProductReview(prd)),
      catchError(err => this.handleMySins(err))
    )
  }
  
  getProductReview(product: Product): Observable<Product>{
    if(product.hasReviews)
        {
            return this.http.get<Review[]>(this.reviewSvc.getReviewUrl(product.id))            
            .pipe(              
              map(r=> {
                product.reviews = r;
                return product
              }),              
              );              
        }
        return of(product)
  }
  handleMySins(err: HttpErrorResponse) : Observable<never>{
      const message = this.errorSvc.formatError(err);
      return throwError( () => message);
  }
}
