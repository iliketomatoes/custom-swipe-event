export interface CustomSwipeEventOptions {
	swipeThreshold: Number
}

export interface CustomSwipeEventsList {
	touchstart: String,
	touchend: String,
	touchmove: String
}

export class CustomSwipeHelper {
	public options: CustomSwipeEventOptions;
	constructor(options: CustomSwipeEventOptions) {
		this.options = options;
	}
}
