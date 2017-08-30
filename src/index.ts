import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorsComponent } from './components/errors.component';
import { ReflectClassesDirective } from './directives/reflect-classes.directive';

export * from './components/errors.component';
export * from './directives/reflect-classes.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ErrorsComponent,
    ReflectClassesDirective
  ],
  exports: [
    ErrorsComponent,
    ReflectClassesDirective
  ]
})
export class NgFormControlErrorsModule { }
