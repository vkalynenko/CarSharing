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

//   export function startDateValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//       if (!control.value) return null;
//       const startDate = new Date(control.parent?.get('expectedReturnDate')?.value);
//       const currentDate = new Date();
//       currentDate.setHours(0, 0, 0, 0);
//       startDate.setHours(0, 0, 0, 0);
  
//       if (startDate > currentDate) {
//         return { 'startDate': { value: control.value } };
//       }
//       return null;
//     };
//   }