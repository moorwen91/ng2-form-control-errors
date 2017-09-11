import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessagesService} from 'ng2-form-control-errors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fceMessages: MessagesService) { }

  ngOnInit(): void {
    this.fceMessages.messages.required = 'Please specifiy this';
    this.fceMessages.errorCssClass = 'help-block';
    this.myForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

}
