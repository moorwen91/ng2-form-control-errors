import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormControlError } from '../form-control-error';
import { ErrorMessages } from '../error-messages';
import { FormControlErrorsConfigService } from '../services/form-control-errors-config.service';

@Component({
  selector: 'ng2-fce-errors',
  template: `
    <div [class]="fceConfig.errorCssClass" *ngFor="let error of formControlErrors">
      {{ getErrorMessage(error) }}
    </div>`
})
export class ErrorsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() source: FormControl;
  @Input() messages: ErrorMessages;
  @Input() onlyFirst?: boolean;

  formControlSubscription: Subscription;
  formControlErrors: FormControlError[];

  constructor(private fceConfig: FormControlErrorsConfigService) { }

  ngOnInit(): void {
    this.onlyFirst = false;
    this.messages = this.messages || {};
    this.registerAndProcessFormControl(this.source);
  }

  ngOnDestroy(): void {
    if (this.formControlSubscription) {
      this.formControlSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.onlyFirst && !changes.onlyFirst.isFirstChange()) {
      this.processErrors();
    }
    if (changes.source && !changes.source.isFirstChange()) {
      this.formControlSubscription.unsubscribe();
      this.registerAndProcessFormControl(changes.source.currentValue);
    }
  }

  getErrorMessage(error: FormControlError): string {
    return this.messages[error.key] || this.fceConfig.messages[error.key] || 'This field is invalid';
  }

  private getKeys(value: Object) {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

  private processErrors() {
    this.formControlErrors = this.getKeys(this.source.errors);
    if (this.onlyFirst && this.formControlErrors.length > 0) {
      this.formControlErrors = [this.formControlErrors[0]];
    }
  }

  private registerAndProcessFormControl(formControl: FormControl): void {
    this.formControlSubscription = formControl.statusChanges.subscribe(() => {
      this.processErrors();
    });
    this.processErrors();
  }

}
