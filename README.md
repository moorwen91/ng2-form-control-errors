# ng2-form-control-errors
Angular's components and directives for showing errors of form-controls

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
This way the elements with the `ng2FceReflectClasses` directive will have (depending on the validation state of the input element) the `valid`, `invalid` and `touched` classes of the input element who contains `FormControl` directives.

## Service
By injecting `ErrorMessagesService` in your component you can customize:
* `errorCssClass`: the css class applied to error messages shown by the `ng2-fce-errors` component. Default css class is `help-block`
* `messages`: the default messages of validation errors.

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
* `messages`: an optional object with `ErrorMessages` interface who holds validation as key and a string as the message for that validation error.

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

## Todo
* Implement tests

## License

MIT ©
