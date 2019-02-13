"use strict";

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static add(v, w) {
		return new Vector(v.x + w.x, v.y + v.y);
	}

	static substract(v, w) {
		return new Vector(v.x - w.x, v.y - w.y);
	}

	static multiply(v, value) {
		return new Vector(v.x*value, v.y*value);
	}

	static divide(v, value) {
		return new Vector(v.x/value, v.y/value);
	}
}
