import { Injectable } from '@angular/core';
import { ErrorMessages } from '../error-messages';

@Injectable()
export class FormControlErrorsConfigService {
  public messages: ErrorMessages;
  public errorCssClass: string;
  public validCssClass: string;
  public invalidCssClass: string;
  public touchedCssClass: string;

  constructor() {
    // validation error message CSS class
    this.errorCssClass = 'help-block';
    // CSS classes for host of `ng2FceReflectClasses` directive
    this.validCssClass = 'valid';
    this.invalidCssClass = 'invalid';
    this.touchedCssClass = 'touched';
    // default validation error messages
    this.messages = {
      required: 'This field is required',
      date: 'This field must be a valid date',
      maxDate: 'This date is too late',
      minDate: 'This date is too soon',
      pattern: 'This field is invalid',
      email: 'This field must be a valid email',
      maxlength: 'This field is too long',
      equalTo: 'Fields do not match',
      url: 'This field should be a valid url',
      range: 'This field is out of range',
      number: 'This field should be a number'
    };
  }
}
