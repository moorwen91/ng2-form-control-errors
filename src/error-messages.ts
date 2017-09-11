export interface ErrorMessages {
    required?: string;
    date?: string;
    maxDate?: string;
    minDate?: string;
    pattern?: string;
    email?: string;
    maxlength?: string;
    equalTo?: string;
    url?: string;
    range?: string;
    number?: string;
    [propName: string]: string;
}
