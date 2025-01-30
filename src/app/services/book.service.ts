import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    console.log('Fetching books with query:', query); // Log the search query
    return this.http.get<Book[]>(`${this.apiUrl}?q=${query}`).pipe(
      catchError((error) => {
        console.error('Error fetching books:', error); // Log any errors
        return throwError(error);
      })
    );
  }
}
