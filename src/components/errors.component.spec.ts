import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';

import { ErrorsComponent } from './errors.component';
import { ErrorMessagesService } from '../services/error-messages.service';
import {Component, DebugElement, OnInit} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('ErrorsComponent', () => {
  let fixture: ComponentFixture<BasicDemoComponent>;
  let basicDemoComponent: BasicDemoComponent;
  let errorCmpDebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ BasicDemoComponent, ErrorsComponent ],
      providers: [ ErrorMessagesService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDemoComponent);
    basicDemoComponent = fixture.componentInstance;
    errorCmpDebugElement = fixture.debugElement.query(By.css('ng2-fce-errors'));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(basicDemoComponent).toBeTruthy();
  });

  it('should have one child error because of validator \'required\'', () => {
    expect(errorCmpDebugElement.children.length).toBe(1);
  });

  it('should have two child errors because of validators \'maxLength\' & \'pattern\'', () => {
    basicDemoComponent.myForm.get('name').setValue('thisnamehavenumbers123andistoolong');
    fixture.detectChanges();
    expect(errorCmpDebugElement.children.length).toBe(2);
  });

  it('should have one child error despite of \'maxLength\' & \'pattern\' validators, because of \'onlyFirst\' property', () => {
    basicDemoComponent.myForm.get('name').setValue('thisnamehavenumbers123andistoolong');
    basicDemoComponent.onlyFirst = true;
    fixture.detectChanges();
    expect(errorCmpDebugElement.children.length).toBe(1);
  });

  it('should have no child errors', () => {
    basicDemoComponent.myForm.get('name').setValue('dummyname');
    fixture.detectChanges();
    expect(errorCmpDebugElement.children.length).toBe(0);
  });

  it('should have a child error with default validation message', () => {
    basicDemoComponent.myForm.get('name').setValue('shcusterr');
    fixture.detectChanges();
    expect(errorCmpDebugElement.children.pop().nativeElement.innerText).toBe('This field is invalid');
  });

  it('should change validation message when source \'FormControl\' change to \'age\'', () => {
    basicDemoComponent.myForm.get('name').setValue('asdasdasdasda99999');
    fixture.detectChanges();
    expect(errorCmpDebugElement.children.length).toBe(2);

    basicDemoComponent.isNameFormControlActive = false;
    fixture.detectChanges();
    expect(errorCmpDebugElement.children.pop().nativeElement.innerText).toBe('This field is required');
  });
});

@Component({
  selector: 'ng2-fce-basic-demo',
  template: `
      <form [formGroup]="myForm" class="form-horizontal" novalidate>
          <div class="form-group">
              <label class="col-md-2 control-label">Name</label>

              <div class="col-md-10">
                  <input formControlName="name" class="form-control" type="text" placeholder="Name">
                  <ng2-fce-errors [source]="getFormControl()" [onlyFirst]="onlyFirst"></ng2-fce-errors>
              </div>
          </div>
      </form>`
})
class BasicDemoComponent implements OnInit {
  myForm: FormGroup;
  onlyFirst: boolean;
  isNameFormControlActive: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isNameFormControlActive = true;
    this.onlyFirst = false;
    this.myForm = this.fb.group({
      'name': ['', [
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
    if (this.isNameFormControlActive) {
      return this.myForm.get('name');
    }
    return this.myForm.get('age');
  }
}
