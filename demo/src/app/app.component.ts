import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ErrorMessagesService} from './ng2-form-control-errors/services/error-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm: FormGroup;
  onlyFirst: boolean;

  constructor(
    private fb: FormBuilder,
    private fceMessages: ErrorMessagesService) { }

  ngOnInit(): void {
    this.onlyFirst = false;
    this.fceMessages.messages.required = 'Please specifiy this';
    this.fceMessages.errorCssClass = 'help-block';
    this.myForm = this.fb.group({
      'name': ['asdasdasdasda99999', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('[a-z]+'),
        (c: AbstractControl): ValidationErrors => {
          if (c.value === 'shcusterr') {
            return {'custom-error': true};
          }
        }
      ]],
      'age': ['', [Validators.required]]
    });
  }

  getFormControl(): AbstractControl {
    if (!this.onlyFirst) {
      return this.myForm.get('name');
    }
    return this.myForm.get('age');
  }

}
