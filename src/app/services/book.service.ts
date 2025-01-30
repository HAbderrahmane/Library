// book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { BookDetails } from '../models/book-details.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}`).pipe(
      map((response) => {
        if (response && response.items) {
          return response.items.map((item: any) => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown'],
            publishedDate: item.volumeInfo.publishedDate || 'N/A',
            thumbnail:
              item.volumeInfo.imageLinks?.thumbnail ||
              'https://via.placeholder.com/128x192',
            id: item.id,
          }));
        } else {
          return [];
        }
      }),
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(() => error);
      })
    );
  }

  getBookById(Id: string): Observable<BookDetails> {
    return this.http.get<BookDetails>(`${this.apiUrl}/${Id}`).pipe(
      catchError((error) => {
        console.error('Error fetching book details:', error);
        return throwError(() => error);
      })
    );
  }
}
