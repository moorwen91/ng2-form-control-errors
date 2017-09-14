import { Component, DebugElement, OnInit } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ReflectClassesDirective } from './reflect-classes.directive';
import {FormControlErrorsConfigService} from '../services/form-control-errors-config.service';

describe('ReflectClassesDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        ReflectClassesDirective,
        EmptyDemoComponent,
        BasicDemoComponent,
        AdvancedDemoComponent
      ],
      providers: [ FormControlErrorsConfigService ]
    })
    .compileComponents();
  });

  describe('when no child FormControl', () => {
    it('should throw error', () => {
      const fixture: ComponentFixture<EmptyDemoComponent> = TestBed.createComponent(EmptyDemoComponent);
      expect(() => {
        fixture.detectChanges();
      }).toThrowError('ng2FceReflectClasses directive needs a child FormControl');
    });
  });

  describe('basic usage', () => {
    let fixture: ComponentFixture<BasicDemoComponent>;
    let containerDebugElement: DebugElement;
    let containerElement: HTMLDivElement;
    let inputElement: DebugElement;
    let reflectClassesDirective: ReflectClassesDirective;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicDemoComponent);
      fixture.detectChanges();
      containerDebugElement = fixture.debugElement.query(By.css('.form-group'));
      inputElement = containerDebugElement.query(By.css('.form-control'));
      containerElement = <HTMLDivElement> containerDebugElement.nativeElement;
      reflectClassesDirective = containerDebugElement.injector.get<ReflectClassesDirective>(ReflectClassesDirective);
    });

    it('on init should not have touched class', () => {
      expect(containerElement.classList.contains('touched')).toBeFalsy();
    });

    it('on blur should have blur class', () => {
      inputElement.triggerEventHandler('blur', null);
      expect(containerElement.classList.contains('touched')).toBeTruthy();
    });

    it('on formControl value is not null should have valid class', () => {
      const basicDemoComponent = <BasicDemoComponent> fixture.componentInstance;
      basicDemoComponent.myForm.setValue({ name: 'asd' });
      fixture.detectChanges();
      expect(containerElement.classList.contains('valid')).toBeTruthy();
    });

    it('on formControl value is null should have invalid class', () => {
      const basicDemoComponent = <BasicDemoComponent> fixture.componentInstance;
      basicDemoComponent.myForm.setValue({ name: null });
      fixture.detectChanges();
      expect(containerElement.classList.contains('invalid')).toBeTruthy();
    });

    it('on formControl value\'s length is greater than 10, should have invalid class', () => {
      const basicDemoComponent = <BasicDemoComponent> fixture.componentInstance;
      basicDemoComponent.myForm.setValue({ name: '123456789011' });
      fixture.detectChanges();
      expect(containerElement.classList.contains('invalid')).toBeTruthy();
    });
  });

  describe('advanced usage', () => {
    let fixture: ComponentFixture<AdvancedDemoComponent>;
    let containerDebugElement: DebugElement;
    let containerElement: HTMLDivElement;
    let inputElement: DebugElement;
    let reflectClassesDirective: ReflectClassesDirective;

    beforeEach(() => {
      fixture = TestBed.createComponent(AdvancedDemoComponent);
      fixture.detectChanges();
      containerDebugElement = fixture.debugElement.query(By.css('.form-group'));
      inputElement = containerDebugElement.query(By.css('#age'));
      containerElement = <HTMLDivElement> containerDebugElement.nativeElement;
      reflectClassesDirective = containerDebugElement.injector.get<ReflectClassesDirective>(ReflectClassesDirective);
    });

    it('should reflect age formControl validation classes', () => {
      inputElement.triggerEventHandler('blur', null);
      expect(containerElement.classList.contains('touched')).toBeTruthy();

      fixture.componentInstance.myForm.get('age').setValue(5);
      fixture.detectChanges();
      expect(containerElement.classList.contains('invalid')).toBeTruthy();

      fixture.componentInstance.myForm.get('age').setValue(15);
      fixture.detectChanges();
      expect(containerElement.classList.contains('valid')).toBeTruthy();
    });
  });
});

@Component({
  selector: 'ng2-fce-basic-demo',
  template: `
      <form [formGroup]="myForm" class="form-horizontal" novalidate>
          <div ng2FceReflectClasses class="form-group">
              <label class="col-md-2 control-label">Name</label>

              <div class="col-md-10">
                  <input formControlName="name" class="form-control" type="text" placeholder="Name">
              </div>
          </div>
      </form>`
})
class BasicDemoComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(10)]]
    });
  }
}

@Component({
  selector: 'ng2-fce-empty-demo',
  template: '<div ng2FceReflectClasses></div>'
})
class EmptyDemoComponent { }

@Component({
  selector: 'ng2-fce-advanced-demo',
  template: `
      <form [formGroup]="myForm" class="form-horizontal" novalidate>
          <div ng2FceReflectClasses="age" class="form-group">
              <div class="row">
                  <label class="col-md-2 control-label">Name</label>

                  <div class="col-md-10">
                      <input formControlName="name" class="form-control" type="text" placeholder="Name">
                  </div>
              </div>
              <div class="row">
                  <label class="col-md-2 control-label">Age</label>

                  <div class="col-md-10">
                      <input id="age" formControlName="age" class="form-control" type="number" placeholder="Age">
                  </div>
              </div>
          </div>
      </form>`
})
class AdvancedDemoComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(10)]],
      'age': ['', [Validators.required, Validators.min(10)]],
    });
  }
}
