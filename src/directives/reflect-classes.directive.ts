import {
  AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnDestroy, QueryList, Renderer
} from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import { FormControlErrorsConfigService } from '../services/form-control-errors-config.service';

@Directive({
  selector: '[ng2FceReflectClasses]'
})
export class ReflectClassesDirective implements AfterContentInit, OnDestroy {

  @Input('ng2FceReflectClasses') formControlName: any = null;
  @ContentChildren(FormControlName) formControls: QueryList<FormControlName>;
  private formControl: FormControlName | FormControl;
  private htmlElement: HTMLElement;
  private removeListener: Function;

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private fceConfig: FormControlErrorsConfigService
  ) { }

  ngAfterContentInit(): void {
    if (this.formControlName != null && this.formControlName !== '') {
      if (typeof this.formControlName === 'string') {
        this.formControl = this.formControls.find(item => item.name === this.formControlName);
        this.htmlElement = this.el.nativeElement.querySelector(`[formControlName="${this.formControlName}"]`);
      }
    } else {
      this.formControl = this.formControls.first;
      this.htmlElement = this.el.nativeElement.querySelector('[formControlName]');
    }

    if (!this.formControl) {
      throw new Error('ng2FceReflectClasses directive needs a child FormControl');
    }

    this.removeListener = this.renderer.listen(this.htmlElement, 'blur', () => this.refreshClasses(true));
    this.formControl.statusChanges.subscribe(status => this.refreshClasses());
    this.refreshClasses();
  }

  refreshClasses(setTouched: boolean = false) {
    this.toggleCssClass('valid', this.formControl.valid);
    this.toggleCssClass('invalid', this.formControl.invalid);
    this.toggleCssClass('touched', this.formControl.touched);

    if (setTouched) {
      this.toggleCssClass('touched', true);
    }
  }

  private toggleCssClass(cssClass: string, isAdd: boolean): void {
    let c = cssClass;
    switch (cssClass) {
      case 'valid': {
        c = this.el.nativeElement.getAttribute('ng2FceValidClass') || this.fceConfig.validCssClass;
        break;
      }
      case 'invalid': {
        c = this.el.nativeElement.getAttribute('ng2FceInvalidClass') || this.fceConfig.invalidCssClass;
        break;
      }
      case 'touched': {
        c = this.el.nativeElement.getAttribute('ng2FceTouchedClass') || this.fceConfig.touchedCssClass;
        break;
      }
    }
    this.renderer.setElementClass(this.el.nativeElement, c, isAdd);
  }

  ngOnDestroy(): void {
    if (this.removeListener) {
      this.removeListener();
    }
  }

}
