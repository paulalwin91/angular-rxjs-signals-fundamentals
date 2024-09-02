import { Injectable } from '@angular/core';
import { Observable, catchError, filter, of, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ProductData } from './product-data';
import { HttpErrorService } from '../utilities/http-error.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  constructor(private http : HttpClient, private errorSvc: HttpErrorService) {        
  }
  
  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(       
      catchError(err=> this.handleMySins(err))
    );
  }
   
  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(this.productsUrl + '/' + id).pipe(
      catchError(err => this.handleMySins(err))
    )
  }

  handleMySins(err: HttpErrorResponse) : Observable<never>{
      const message = this.errorSvc.formatError(err);
      return throwError( () => message);
  }
}
