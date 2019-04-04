import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../api-services/common.service';
import {Book} from '../../models/Book'
import * as md5 from 'md5';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

	books:Book[];
  constructor(private commonService:CommonService) { }


  ngOnInit() {
	  this.getBooks();
  }
 

  private getBooks(){
	  this.commonService.getBooks()
		  .subscribe(
		  	response => {this.books=response},
		  	error=>{console.log(error.message)}
		  	)
  }


}
