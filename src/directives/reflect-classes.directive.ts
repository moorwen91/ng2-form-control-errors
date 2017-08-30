import {
  AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnDestroy, QueryList, Renderer
} from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Directive({
  selector: '[ngFceReflectClasses]'
})
export class ReflectClassesDirective implements AfterContentInit, OnDestroy {

  @Input('reflectFormControlClasses') formControlName: any = null;
  @ContentChildren(FormControlName) formControls: QueryList<FormControlName>;
  private formControl: FormControlName | FormControl;
  private $formControl: ElementRef;
  private removeListener: Function;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngAfterContentInit(): void {
    if (this.formControlName != null && this.formControlName !== '') {
      if (typeof this.formControlName === 'string') {
        this.formControl = this.formControls.find(item => item.name === this.formControlName);

        this.$formControl = this.el.nativeElement.querySelector(`[formControlName="${this.formControlName}"]`);
        if (this.$formControl === null) {
          this.$formControl = this.el.nativeElement.querySelector('.form-control');
        }
      } else if (typeof this.formControlName === 'object') {
        this.formControl = this.formControlName.formControl;
        this.$formControl = this.el.nativeElement.querySelector(`[name="${this.formControlName.name}"]`);
      }
    } else {
      this.formControl = this.formControls.first;

      this.$formControl = this.el.nativeElement.querySelector('[formControlName]');
      if (this.$formControl === null) {
        this.$formControl = this.el.nativeElement.querySelector('.form-control');
      }
    }

    if (!this.formControl) {
      throw new Error('ngFceReflectClasses directive needs a child FormControl');
    }

    this.removeListener = this.renderer.listen(this.$formControl, 'blur', () => this.refreshClasses(true));
    this.formControl.statusChanges.subscribe(status => this.refreshClasses());
    this.refreshClasses();
  }

  refreshClasses(setTouched: boolean = false) {
    this.renderer.setElementClass(this.el.nativeElement, 'valid', this.formControl.valid);
    this.renderer.setElementClass(this.el.nativeElement, 'invalid', this.formControl.invalid);
    this.renderer.setElementClass(this.el.nativeElement, 'touched', this.formControl.touched);

    if (setTouched) {
      this.renderer.setElementClass(this.el.nativeElement, 'touched', true);
    }
  }

  ngOnDestroy(): void {
    if (this.removeListener) {
      this.removeListener();
    }
  }

}
