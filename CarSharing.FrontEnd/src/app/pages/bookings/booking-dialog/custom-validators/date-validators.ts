import { ValidatorFn, AbstractControl } from "@angular/forms";

export function maxDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const inputDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
  
      if (inputDate > currentDate) {
        return { 'maxDate': { value: control.value } };
      }
      return null;
    };
  }

  export function startDateExpectedDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      if (!control.parent?.get('expectedReturnDate')?.value) return null;
      const expectedReturnDate = new Date(control.parent?.get('expectedReturnDate')?.value);
      const startDate = new Date(control.value);
      expectedReturnDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
  
      if (startDate > expectedReturnDate) {
        return { 'biggerThanExpected': { value: control.value } };
      }
      return null;
    };
  }

  export function startDateReturnDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      if (!control.parent?.get('actualReturnDate')?.value) return null;
      const returnDate = new Date(control.parent?.get('actualReturnDate')?.value);
      const startDate = new Date(control.value);
      returnDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
  
      if (startDate > returnDate) {
        return { 'biggerThanActual': { value: control.value } };
      }
      return null;
    };
  }

  export function expectedDateStartDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const expectedReturnDate = new Date(control.value);
      if (!control.parent?.get('startDate')?.value) return null;
      const startDate = new Date(control.parent?.get('startDate')?.value);
      expectedReturnDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
  
      if (startDate > expectedReturnDate) {
        return { 'lessThanStart': { value: control.value } };
      }
      return null;
    };
  }

  export function actualDateStartDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const actualDate = new Date(control.value);
      if (!control.parent?.get('startDate')?.value) return null;
      const startDate = new Date(control.parent?.get('startDate')?.value);
      actualDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
  
      if (startDate > actualDate) {
        return { 'lessThanStart': { value: control.value } };
      }
      return null;
    };
  }
