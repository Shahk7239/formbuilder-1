import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FetcherService } from '../fetcher.service';
import {SignaturePad} from 'ngx-signaturepad';

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
    'orgid': ''
  };

  ngOnInit(): void {
  }

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL('img/png'));
  }

  async saveScreen(screenForm:NgForm) {
    //save form data in service and call post API
      
    this.fetchService.screenData = screenForm.value;

    this.router.navigateByUrl('/createform');
  }

}
