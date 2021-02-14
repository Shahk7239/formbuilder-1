import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FetcherService } from '../fetcher.service';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.css']
})
export class AddScreenComponent implements OnInit {

  constructor(private router:Router,
    private fetcher:FetcherService) { }

  model: any = {
    'screenname': '',
    'screenno': '',
    'adminid': '',
    'orgname': '',
    'orgid': null,
  };

  ngOnInit(): void {
  }

  saveScreen(screenForm:NgForm) {
    //save form data in service and call post API
        
    // this.fetcher.saveScreenData(screenForm.value).subscribe((data: {}) => {
    //   console.log(data);
    //   this.router.navigateByUrl('/create-form');
    // })

    this.router.navigateByUrl('/create-form');
  }

}
