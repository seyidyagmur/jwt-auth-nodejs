import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';

import * as md5 from 'md5';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {


  constructor(private bookService:BookService) { }


  ngOnInit() {
	  this.getBooks();
  }
 

  private getBooks(){
	  this.bookService.getBooks()
		  .subscribe(
		  	response => {console.log(response)},
		  	error=>{console.log(error.message)}
		  	)
  }

}
