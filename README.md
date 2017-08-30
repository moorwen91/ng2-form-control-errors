# ng-form-control-errors
Angular's components and directives for showing errors of form-controls

## Installation

To install this library, run:

```bash
$ npm install ng-form-control-errors --save
```

## Integration

Should work out of the box with webpack, respectively angular-cli. All you need to do is to include `NgFormControlErrorsModule`:

```ts
import { NgFormControlErrorsModule } from 'ng-form-control-errors';

@NgModule({
  imports: [NgFormControlErrorsModule],
  ...
})
class AppModule {}
```

## License

MIT © [Rigoberto Moya González](mailto:rigomoya2@gmail.com)
