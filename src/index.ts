import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorsComponent } from './components/errors.component';
import { ReflectClassesDirective } from './directives/reflect-classes.directive';
import { FormControlErrorsConfigService } from './services/form-control-errors-config.service';

export * from './components/errors.component';
export * from './directives/reflect-classes.directive';
export * from './services/form-control-errors-config.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ErrorsComponent,
    ReflectClassesDirective
  ],
  providers: [
    FormControlErrorsConfigService
  ],
  exports: [
    ErrorsComponent,
    ReflectClassesDirective
  ]
})
export class Ng2FormControlErrorsModule { }
