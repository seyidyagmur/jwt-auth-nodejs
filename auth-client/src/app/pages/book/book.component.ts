import { Component, OnInit } from '@angular/core';
import { BookService } from '../../api-services/book.service';
import {Book} from '../../models/Book'
import * as md5 from 'md5';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

	books:Book[];
  constructor(private bookService:BookService) { }


  ngOnInit() {
	  this.getBooks();
  }
 

  private getBooks(){
	  this.bookService.getBooks()
		  .subscribe(
		  	response => {this.books=response
		  		console.log(this.books)},
		  	error=>{console.log(error.message)}
		  	)
  }
  

}
