import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormControlError } from '../form-control-error';
import { ErrorMessages } from '../error-messages';
import { ErrorMessagesService } from '../services/error-messages.service';

@Component({
  selector: 'ng2-fce-errors',
  template: `
    <span [class]="msgService.errorCssClass" *ngFor="let error of formControlErrors">
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

  constructor(private msgService: ErrorMessagesService) { }

  ngOnInit(): void {
    this.messages = this.messages || {};
  }

  ngOnDestroy(): void {
    this.formControlSubscription.unsubscribe();
  }

  getErrorMessage(error: FormControlError): string {
    return this.messages[error.key] || this.msgService.messages[error.key] || 'This field is invalid';
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
