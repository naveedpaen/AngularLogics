export class ControlBase<T> {
	value: T | undefined;
	key: string;
	label: string;
	required: boolean;
	order: number;
	controlType: string; // input, checkbox,select,radio,
	type: string; // if input then text,number
	options: { key: string; value: string }[];

	constructor(
		options: {
			value?: T;
			key?: string;
			label?: string;
			required?: boolean;
			order?: number;
			controlType?: string;
			type?: string;
			options?: { key: string; value: string }[];
		} = {}
	) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.order = options.order === undefined ? 1 : options.order;
		this.controlType = options.controlType || '';
		this.type = options.type || '';
		this.options = options.options || [];
	}
}

export class TextBox extends ControlBase<string> {
	override controlType = 'textbox';
}

export class Number extends ControlBase<string> {
	override controlType = 'number';
}

export class Radio extends ControlBase<string> {
	override controlType = 'radio';
}

export class Checkbox extends ControlBase<string> {
	override controlType = 'checkbox';
}

export class Select extends ControlBase<string> {
	override controlType = 'select';
}
