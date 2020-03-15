"use strict";

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		let w = Vector.add(this, v);

		this.x = w.x;
		this.y = w.y;
	}

	subtract(v) {
		let w = Vector.subtract(this, v);

		this.x = w.x;
		this.y = w.y;
	}

	multiply(v) {
		let w = Vector.multiply(this, v);

		this.x = w.x;
		this.y = w.y;
	}

	divide(v) {
		let w = Vector.divide(this, v);

		this.x = w.x;
		this.y = w.y;
	}

	static add(v, w) {
		return new Vector(v.x + w.x, v.y + w.y);
	}

	static subtract(v, w) {
		return new Vector(v.x - w.x, v.y - w.y);
	}

	static multiply(v, value) {
		return new Vector(v.x*value, v.y*value);
	}

	static divide(v, value) {
		return new Vector(v.x/value, v.y/value);
	}
}
