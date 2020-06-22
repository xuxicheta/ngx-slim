/**
 * maybe useful
 */


//
// import { ElementRef, forwardRef, HostListener, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { formatDate } from '@angular/common';
//
// export const DATEPICKER_VALUE_ACCESSOR: any = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => DatepickerValueAccessor),
//   multi: true
// };
//
//
// export class DatepickerValueAccessor implements ControlValueAccessor {
//   protected dateFormat = 'shortDate';
//
//   @HostListener('blur')
//   onBlur() {
//     this.onTouched();
//   }
//
//   @HostListener('input', ['$event'])
//   onInput(evt: KeyboardEvent) {
//     this.onChange((evt.target as HTMLInputElement).value);
//   }
//
//   onChange = (_: any) => {
//   };
//
//   onTouched = () => {
//   };
//
//
//   constructor(
//     private renderer: Renderer2,
//     private elRef: ElementRef,
//     @Inject(LOCALE_ID) private localeID: string,
//   ) {
//   }
//
//   writeValue(value: Date): void {
//     const normalizedValue = formatDate(value, this.dateFormat, this.localeID);
//     this.renderer.setProperty(this.elRef.nativeElement, 'value', normalizedValue);
//   }
//
//   registerOnChange(fn: (_: any) => void): void {
//     this.onChange = fn;
//   }
//
//   registerOnTouched(fn: () => void): void {
//     this.onTouched = fn;
//   }
//
//   setDisabledState(isDisabled: boolean): void {
//     this.renderer.setProperty(this.elRef.nativeElement, 'disabled', isDisabled);
//   }
//
//   private handleInput(value: any): void {
//     this.onChange(value);
//   }
// }
