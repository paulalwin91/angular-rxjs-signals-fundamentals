import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  // Just enough here for the code to compile
  private reviewsUrl = 'api/reviews';

  /**
   *
   */
  constructor(private http: HttpClient) {
    
    
  }  
  getReviewUrl(productId: number): string {
    // Use appropriate regular expression syntax to
    // get an exact match on the id
    return this.reviewsUrl + '?productId=^' + productId + '$';
  }

  getProductReview(product: Product): Observable<Product>{
    if(product.hasReviews)
        {
            this.http.get<Review[]>(this.getReviewUrl(product.id)).subscribe({
              next: reviews => product.reviews = reviews
            })
        }
        return of(product)
  }
}
