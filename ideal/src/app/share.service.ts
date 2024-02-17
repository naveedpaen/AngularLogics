import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
	providedIn: 'root'
})
export class ShareService {
	subject = new Subject<number>();

	constructor() {}
}
