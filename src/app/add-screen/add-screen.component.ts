import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FetcherService } from '../fetcher.service';
import {SignaturePadModule} from 'ngx-signaturepad';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.css']
})
export class AddScreenComponent implements OnInit {

  constructor(private router:Router,
    private fetchService:FetcherService) { }

  model: any = {
    'screenname': '',
    'screenid': '',
    'adminid': '',
    'orgname': '',
    'orgid': null,
  };

  ngOnInit(): void {
    if(localStorage.getItem('screen') != null)
    this.model = JSON.parse(localStorage.getItem('screen'));
  }

  // @ViewChild(SignaturePad) signaturePad: SignaturePad;

  // drawComplete() {
  //   // will be notified of szimek/signature_pad's onEnd event
  //   console.log(this.signaturePad.toDataURL('img/png'));
  // }

  async saveScreen(screenForm:NgForm) {
    //save form data in service and call post API
      
    if(localStorage.getItem('screen') === null)
    {
      this.fetchService.screenData = screenForm.value;
      localStorage.removeItem('screen');
      localStorage.setItem('screen', JSON.stringify(screenForm.value));

      (this.fetchService.createDB(this.fetchService.screenData["orgname"]))
      .subscribe((data:{})=>{
        console.log(data);
      });

      (await this.fetchService.createScreen())
      .subscribe(async (data:{}) =>{
        console.log(data);
      });
    }

    this.router.navigateByUrl('/createform');
  }

}
