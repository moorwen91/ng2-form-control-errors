import { Injectable } from '@angular/core';
import { ErrorMessages } from '../error-messages';

@Injectable()
export class ErrorMessagesService {
    public messages: ErrorMessages;
    public errorCssClass: string;

    constructor() {
        this.errorCssClass = 'help-block';
        this.messages = {
            required: 'This field is required',
            date: 'This field must be a valid date',
            maxDate: 'This date is too late',
            minDate: 'This date is too soon',
            pattern: 'This field is invalid',
            email: 'This field must be a valid email',
            maxlength: 'This field is too long',
            equalTo: 'Fields do not match',
            url: 'This field should be a valid url',
            range: 'This field is out of range',
            number: 'This field should be a number'
        };
    }
}
