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
    'existForm':false,
    'existTable':false,
    'formName':'',
    'formNames':[],
    'forms':[]
  };

  prevScreenID = ""
  ngOnInit(): void {
    if(JSON.stringify(this.fetchService.screenData) !== '{}')
    {
      this.model = this.fetchService.screenData;
    }
  }

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL('img/png'));
  }

  FormTemplates():void
  {
    if(this.prevScreenID !== this.model.screenid && this.model.screenid !== '')
    {
      this.model.formNames = [];
      this.fetchService.getForm(this.model.screenid)
      .subscribe((res) => {
        res.map((data) => {
          this.model.formNames.push(data.FormName)
          this.model.forms.push(data)
        })

      });
    }
    if(this.model.screenid === '')
    {
      this.model.formNames = [];
      this.model.forms = [];
    }
      
    this.prevScreenID = this.model.screenid;
  }

  
  async nextPage(screenForm:NgForm) {

    this.fetchService.screenData = this.model;
    
    this.router.navigateByUrl('/createform');
  }

}
