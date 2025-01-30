// book-details.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { CommonModule } from '@angular/common';
import { BookDetails } from '../../../../models/book-details.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Book } from '../../../../models/book.model';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  public bookDetails: BookDetails | undefined;
  public book: Book[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const bookId = params['id'];
      if (bookId) {
        this.getBookById(bookId);
      }
    });
  }
  getBookById(bookId: string) {
    this.bookService.getBookById(bookId).subscribe(
      (bookDetails: BookDetails) => {
        this.fetchAllBooks(bookId);
        this.bookDetails = bookDetails;
        console.log('Book Details:', this.book);
      },
      (error) => {
        console.error('Error fetching book details:', error);
      }
    );
  }

  fetchAllBooks(query: string): Book[] {
    this.bookService.searchBooks(query + '&maxResults=40').subscribe(
      (book: Book[]) => {
        book.forEach((b: Book) => {
          if (b.id === query) {
            this.book.push(b);
            console.log(this.book);
          }
        });
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
    return this.book;
  }
}
