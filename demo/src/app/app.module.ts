import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2FormControlErrorsModule } from 'ng2-form-control-errors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    Ng2FormControlErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
