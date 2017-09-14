import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormControlErrorsConfigService } from 'ng2-form-control-errors';

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
    private fceConfig: FormControlErrorsConfigService
  ) { }

  ngOnInit(): void {
    this.fceConfig.messages.required = 'Please specifiy this';
    this.fceConfig.errorCssClass = 'form-control-feedback';
    this.fceConfig.validCssClass = 'has-success';
    this.fceConfig.invalidCssClass = 'has-danger';

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
      'age': ['', [Validators.required]],
      'onlyFirst': [false]
    });
  }

}
