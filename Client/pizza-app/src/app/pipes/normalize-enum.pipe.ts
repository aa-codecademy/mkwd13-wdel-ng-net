import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeEnum',
  standalone: true,
})
export class NormalizeEnumPipe implements PipeTransform {
  transform(value: string | string[]): string {
    // if it is array of strings
    if (Array.isArray(value)) {
      return value.map((v) => this.capitalizeIngredient(v)).join(', ');
    }

    // if it is an unknown value
    if (typeof value !== 'string' || !value.length) {
      ('');
    }

    // if it is a single string
    return this.capitalizeIngredient(value);
  }

  capitalizeIngredient(value: string): string {
    const firstLetter = value.charAt(0).toUpperCase();
    const lowerCaseValue = value.slice(1).toLowerCase();

    return `${firstLetter}${lowerCaseValue}`.replace('_', ' '); // replace method: Chilli_Pepper ==> Chilli Pepper
  }
}
