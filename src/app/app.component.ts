import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookRoutingModule } from './components/book/book/book-routing.module'; // Import the new routing module

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookRoutingModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
