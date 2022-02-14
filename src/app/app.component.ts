import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleBooksService } from './book-list/books.service';
import { addBook, removeBook, retrievedBookList } from './state/books.action';
import { selectBookCollection, selectBooks } from './state/books.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);



  onAdd(bookId: string){
    this.store.dispatch(addBook({bookId}))
  }

  onRemove(bookId: string){
    this.store.dispatch(removeBook({bookId}))
  }
  
  constructor( private bookService: GoogleBooksService,
               private store: Store){

  }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe(
      (books: any) => this.store.dispatch(retrievedBookList({books}))
    )
    
  }
}
