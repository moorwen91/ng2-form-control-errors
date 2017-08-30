import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormControlError } from '../form-control-error';
import { ErrorMessages } from '../error-messages';

@Component({
  selector: 'ng2-fce-errors',
  template: `
    <span class="help-block" *ngFor="let error of formControlErrors">
      {{ getErrorMessage(error) }}
    </span>`
})
export class ErrorsComponent implements OnInit, OnDestroy {

  @Input() onlyFirst?: boolean = false;
  private formControlSubscription: Subscription;

  formControlErrors: FormControlError[];
  @Input('source')
  set source(formControl: FormControl) {
    if (!this.formControlSubscription) {
      this.formControlSubscription = formControl.statusChanges.subscribe(() => {
        this.processErrors(formControl);
      });
      this.processErrors(formControl);
    }
  }

  @Input() messages: ErrorMessages;

  constructor() { }

  ngOnInit(): void {
    this.messages = this.messages || {};
  }

  ngOnDestroy(): void {
    this.formControlSubscription.unsubscribe();
  }

  getErrorMessage(error: FormControlError): string {
    switch (error.key) {
      case 'required':
        return this.messages.required || 'This field is required';
      case 'date':
        if (this.messages.date) {
          return this.messages.date;
        }
        break;
      case 'maxDate':
        if (this.messages.maxDate) {
          return this.messages.maxDate;
        }
        break;
      case 'pattern':
        return this.messages.pattern || 'This field is invalid';
      case 'email':
        return this.messages.email || 'Email is invalid';
      case 'maxlength':
        return this.messages.maxlength || 'This field is too long';
      case 'equalTo':
        return this.messages.equalTo || 'Fields do not match';
      case 'url':
        return this.messages.url || 'This field should be a valid url';
      case 'range':
        return this.messages.range || 'This field is out of range';
      case 'number':
        return this.messages.number || 'This field should be a number';
    }
  }

  private getKeys(value: Object) {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

  private processErrors(formControl: FormControl) {
    this.formControlErrors = this.getKeys(formControl.errors);
    if (this.onlyFirst && this.formControlErrors.length > 0) {
      this.formControlErrors = [this.formControlErrors[0]];
    }
  }

}
