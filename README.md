# ng2-form-control-errors
[![Coverage Status](https://coveralls.io/repos/github/moorwen91/ng2-form-control-errors/badge.svg?branch=master)](https://coveralls.io/github/moorwen91/ng2-form-control-errors?branch=master)
[![Build Status](https://travis-ci.org/moorwen91/ng2-form-control-errors.svg?branch=master)](https://travis-ci.org/moorwen91/ng2-form-control-errors)

Angular's components and directives for showing errors of form-controls. Use it alongside ReactiveForms.

## Installation

To install this library, run:

```bash
$ npm install ng2-form-control-errors --save
```

## Integration

Should work out of the box with webpack, respectively angular-cli. All you need to do is to include `Ng2FormControlErrorsModule`:

```ts
import { Ng2FormControlErrorsModule } from 'ng2-form-control-errors';

@NgModule({
  imports: [
    ...
    Ng2FormControlErrorsModule
  ],
  ...
})
class AppModule {}
```

## Usage
### Directive
In your template you may add the `ng2FceReflectClasses` directive to the input elements who contains `FormControl` directives e.g.:
```html
  <div ng2FceReflectClasses class="form-group">
    <label class="col-md-2 control-label">Name</label>

    <div class="col-md-10">
      <input formControlName="name" class="form-control" type="text" placeholder="Name">
    </div>
  </div>
```
This way the elements with the `ng2FceReflectClasses` directive will have by default (depending on the validation state of the input element) the `valid`, `invalid` and `touched` classes of the input element who contains `FormControl` directives. You can customize these classes in two ways:
 * By setting the `validCssClass`, `invalidCssClass` and `touchedCssClass` properties of the `FormControlErrorsConfigService`. This values will be used globally.
 * By adding the attributes `ng2FceValidClass`, `ng2FceInvalidClass` and `ng2FceTouchedClass` and setting their values to corresponding classes. If present, the values of these attributes will be used instead of the properties of the `FormControlErrorsConfigService`.
 ```html
   <div ng2FceReflectClasses class="form-group"
    ng2FceValidClass="formControlOK"
    ng2FceInvalidClass="formControlWithError"
    ng2FceTouchedClass="formControlWasTouched">
     ...
   </div>
 ```

If you have several `formControl` children inside the element with this directive, you can specify the name of the `formControl` you want to reflect his clasess as the value of the directive e.g.:
```html
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
```

## Service
By injecting `FormControlErrorsConfigService` in your component you can customize:
* `errorCssClass`: the css class applied to error messages shown by the `ng2-fce-errors` component. Default css class is `help-block`
* `messages`: the default messages of validation errors.
* `validCssClass`, `invalidCssClass` and `touchedCssClass`: default CSS classes for the host element of `ng2FceReflectClasses` directive.

### Component
In your template you may add the `ng2-fce-errors` component and this will show error messages depending on validation state of the `FormControl` it points e.g.:
```typescript
@Component({
  selector: 'app-root',
  template: `
  <form [formGroup]="myForm" class="form-horizontal" novalidate>
    <div class="form-group">
      <label class="col-md-2 control-label">Name</label>
  
      <div class="col-md-10">
        <input formControlName="name" class="form-control" type="text" placeholder="Name">
        <ng2-fce-errors [source]="myForm.get('name')"></ng2-fce-errors>
      </div>
    </div>
  </form>`
})
export class AppComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fceMessages: MessagesService) { }

  ngOnInit(): void {
    this.fceMessages.messages.required = 'Please specifiy this';
    this.fceMessages.errorCssClass = 'help-block';
    this.myForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

}
```
The `ng2-fce-errors` component has three properties:
* `source`: holds the `FormControl` object to validate.
* `onlyFirst`: optional boolean value to only show the first validation error message.
* `messages`: an optional object with `ErrorMessages` interface who holds validation as key and a string as the message for that validation error. The supplied messages here will be used instead of messages in `MessagesService`.

## Example app
The demo subfolder contains a project created with angular-cli that has been adapted to showcase the functionality of ng2-form-control-errors. Run the demo app by executing the following command in the project root directory:
```bash
$ npm run demo
```
This will perform the following steps:
```
// Change into the example website folder
cd demo/
// Install the demo website's dependencies
npm install
// Run the server
ng serve
```

## License

MIT ©
