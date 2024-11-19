// src/types.ts
export interface Form {
    formTitle: string;
    formDescription: string;
    fields: Field[];
}

export interface Field {
    id: string;
    type: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    validation?: Validation;
    options?: Option[];
}

export interface Validation {
    pattern: string;
    message: string;
}

export interface Option {
    value: string;
    label: string;
}
