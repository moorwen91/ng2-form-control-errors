import {
  AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnDestroy, QueryList, Renderer
} from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';

@Directive({
  selector: '[ng2FceReflectClasses]'
})
export class ReflectClassesDirective implements AfterContentInit, OnDestroy {

  @Input('ng2FceReflectClasses') formControlName: any = null;
  @ContentChildren(FormControlName) formControls: QueryList<FormControlName>;
  private formControl: FormControlName | FormControl;
  private htmlElement: HTMLElement;
  private removeListener: Function;

  constructor(private el: ElementRef, private renderer: Renderer) { }

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
