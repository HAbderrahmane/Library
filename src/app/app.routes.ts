import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'book',
    loadChildren: () =>
      import('./components/book/book/book-routing.module').then(
        (m) => m.BookRoutingModule
      ),
  },
  { path: '', redirectTo: 'book', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
