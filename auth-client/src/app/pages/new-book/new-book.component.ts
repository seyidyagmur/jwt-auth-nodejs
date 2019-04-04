import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../api-services/book.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {


	constructor(private bookService: BookService,private router:Router,private location:Location) { }

  ngOnInit() {}

  addBook(content){
  		this.bookService.addBook(content)
			.subscribe(
				response => {
					this.router.navigate(['book'])
				},
				error => {
				 console.log(error.message) }
				)
  }

  goBack(){
	  this.location.back();
  }
   

}
