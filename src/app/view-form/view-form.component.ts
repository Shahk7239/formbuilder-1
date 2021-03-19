import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import swal from 'sweetalert2';
import { FetcherService } from '../fetcher.service';
import { field, value } from '../global.model';
import { SignaturePad } from 'ngx-signaturepad';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  constructor(
    private fetchService: FetcherService
  ) { }

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
   
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 100,
    'backgroundColor': '#FFFF88',
  };

 
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL('image/png'));
  }
 
   
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  @Input() indexval: number;
  value:value={
    label:"",
    value:""
  };
  success = false;
  report: boolean = false;
  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
      "regex" : "",
      "handle":true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$",
      "errorText": "Please enter a valid email",
      "handle":true
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Phone",
      "description": "Enter your phone",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "regex" : "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$",
      "errorText": "Please enter a valid phone number",
      "handle":true
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "fa-html5",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Date",
      "placeholder": "Date",
      "className": "form-control"
    },
    {
      "type": "datetime-local",
      "icon":"fa-calendar",
      "label": "DateTime",
      "placeholder": "Date Time",
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon":"fa-text-width",
      "label": "Textarea" 
    },
    {
      "type": "paragraph",
      "icon": "fa-paragraph",
      "label": "Paragraph",
      "placeholder": "Type your text to display here only" 
    },
    {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox",
      "icon":"fa-list",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon":"fa-bars",
      "label": "Select",
      "description": "Select",
      "placeholder": "Select",
      "className": "form-control",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "icon":"fa-file",
      "label": "File Upload",
      "className": "form-control",
      "subtype": "file"
    },
    {
      "type": "button",
      "icon":"fa-paper-plane",
      "subtype": "submit",
      "label": "Submit"
    },
    {
      "type": "signature",
      "icon": "fa-pencil",
      "label": "Signature",
    }
  ];
  modelFields:Array<field>=[];
  model:any = {
    name:'App name...',
    description:'App Description...',
    theme:{
      bgColor:"ffffff",
      textColor:"555555",
      bannerImage:""
    },
    attributes:this.modelFields 
  };
  
  ngOnInit() {
    this.getAvailableForms();
  }

  getAvailableForms(){
    //console.log(this.fetchService.screenData);
    
  } 

  initReport(){
    this.report = true; 
    let input = {
      id:this.model._id
    }
    
  }



  toggleValue(item){
    item.selected = !item.selected;
  }

  submit(){
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      //console.log(field.label+'=>'+field.required+"=>"+field.value);
      if(field.required && !field.value && field.type != 'checkbox'){
        swal('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if(field.required && field.regex){
        let regex = new RegExp(field.regex);
        if(regex.test(field.value) == false){
          swal('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if(field.required && field.type == 'checkbox'){
        if(field.values.filter(r=>r.selected).length == 0){
          swal('Error','Please enter '+field.label,'error');
          valid = false;
          return false;
        }
      }
    });
    if(!valid){
      return false;
    }   

    // //Saving to DB
    // var attr = this.model.attributes;
    // var labels = []
    // var values = []

    // for(var i=0;i<attr.length;i++)
    // {
    //     if(attr[i].label != "Submit" && attr[i].value !== undefined && attr[i].value != ""){
    //       labels.push(attr[i].label.replace(/\s+/g, '_'));
    //       values.push(attr[i].value);
    //     }
    //     if(attr[i].type === "checkbox")
    //     {
    //       labels.push(attr[i].label.replace(/\s+/g, '_'));
    //       var checkBox = attr[i].values;
    //       var val = ""
    //       checkBox.map((obj)=> {
    //         if(obj.selected === true)
    //         {
    //           val = val + obj.value + ", ";
    //         }
    //       })
    //       val = val.slice(0,-2);
    //       values.push(val);
    //       //console.log(val);
    //     }
    // }
    // if(labels.length > 0){
    //   //console.log(labels)
    //   //console.log(values)
    //   var body = {"dbName":this.fetchService.screenData["orgname"],"formID":"ID","labels":labels,"values" :values};
    //   (this.fetchService.postForm(body))
    //   .subscribe((data:{}) =>{
    //     console.log(data);
    //   });
    // }

    
    alert("Saved")
    this.clearInputs();
    let input = new FormData;
    input.append('formId',this.model._id);
    input.append('attributes',JSON.stringify(this.model.attributes))

    // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','You have contact sucessfully','success');
    //   this.success = true;
    // },error=>{
    //   swal('Error',error.message,'error');
    // });
  }

  clearInputs(){
    var attr = this.model.attributes;
    for(var i=0;i<attr.length;i++)
    {
        if(attr[i].label != "Submit"){
          attr[i].value = "";
        }
    }
    this.model.attributes = attr;

  }

}
