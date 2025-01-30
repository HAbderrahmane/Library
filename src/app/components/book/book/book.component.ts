// book.component.ts
import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../models/book.model';
import { SearchInputComponent } from '../../../design/input-search/input-search.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, SearchInputComponent, RouterModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  public books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    this.bookService.searchBooks('a&maxResults=40').subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onSearch(term: string) {
    this.bookService.searchBooks(term).subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onClick(bookId: string) {
    this.router.navigate(['book', 'book-details', bookId]);
  }
}
