import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
	const valid = /^\d+$/.test(control.value);
	return valid ? null : { invalidNumber: { valid: false, value: control.value } };
}

export function ZeroIsInvalidAtStartValidator(control: AbstractControl): { [key: string]: any } | null {
	const valid = /^[1-9][0-9]*$/.test(control.value);
	return valid ? null : { ZeroIsInvalid: { anyField: true, value: control.value } };
}

export function reservedNameValidator(heroes: any[]): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const reserved = heroes.find(hero => hero.name === control.value);
		return reserved ? { reservedName: true } : null;
	};
}

export function asyncNoLeadingSpaceValidator(control: AbstractControl): Observable<ValidationErrors | null> {
	const value = control.value;
	if (typeof value === 'string' && value.trim() !== value) {
		return of({ leadingSpace: true });
	}
	return of(null);
}

export function synNoLeadingSpaceValidator(control: AbstractControl): { [key: string]: any } | null {
	const value = control.value;
	if (typeof value === 'string' && value.trim() !== value) {
		return { leadingSpace: true, value: value };
	}
	return null;
}

export function atLeastOneOptionSelectedValidator(currentFormGroup: AbstractControl): { [key: string]: any } | null {
	debugger;
	const cricketSelected = currentFormGroup.get('cricket')?.value;
	const footballSelected = currentFormGroup.get('football')?.value;
	const otherSelected = currentFormGroup.get('other')?.value;

	return cricketSelected || footballSelected || otherSelected ? null : { atLeastOneOptionRequired: true };
}

// <span class="help-block" *ngIf="heroDetails.
// controls.name.hasError('reservedName')">Hero name is
// already taken</span>
