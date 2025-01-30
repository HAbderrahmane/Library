import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service'; // Corrected path
import { Book } from '../../../models/book.model'; // Corrected path
import { SearchInputComponent } from '../../../design/input-search/input-search.component'; // Corrected path
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, SearchInputComponent],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.fetchAllBooks(); // Fetch all books on initialization
  }

  fetchAllBooks() {
    const apiUrl =
      'https://www.googleapis.com/books/v1/volumes?q=a&maxResults=40'; // Updated API URL
    this.bookService.searchBooks(apiUrl).subscribe(
      (response: any) => {
        console.log('API Response:', response); // Log the API response
        if (response.items) {
          this.books = response.items.map((item: any) => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown'],
            publishedDate: item.volumeInfo.publishedDate || 'N/A',
            thumbnail:
              item.volumeInfo.imageLinks?.thumbnail ||
              'https://via.placeholder.com/128x192',
          }));
        } else {
          console.error('No items found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching books:', error); // Log any errors
      }
    );
  }

  onSearch(term: string) {
    console.log('Search Term:', term); // Log the search term
    this.bookService.searchBooks(term).subscribe(
      (response: any) => {
        console.log('API Response:', response); // Log the API response
        if (response.items) {
          this.books = response.items.map((item: any) => ({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown'],
            publishedDate: item.volumeInfo.publishedDate || 'N/A',
            thumbnail:
              item.volumeInfo.imageLinks?.thumbnail ||
              'https://via.placeholder.com/128x192',
          }));
        } else {
          console.error('No items found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching books:', error); // Log any errors
      }
    );
  }
}
