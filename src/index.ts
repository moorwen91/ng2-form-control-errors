import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorsComponent } from './components/errors.component';
import { ReflectClassesDirective } from './directives/reflect-classes.directive';
import { ErrorMessagesService } from './services/error-messages.service';

export * from './components/errors.component';
export * from './directives/reflect-classes.directive';
export * from './services/error-messages.service';

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
    ErrorMessagesService
  ],
  exports: [
    ErrorsComponent,
    ReflectClassesDirective
  ]
})
export class Ng2FormControlErrorsModule { }
