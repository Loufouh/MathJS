"use strict";

/**
 * Represents a couple a values.
 */
class Vector {
	/**
	 * The constructor.
	 * @param x The x component.
	 * @param y The y component.
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Add a vector.
	 * @param v The vector to add.
	 */
	add(v) {
		let w = Vector.add(this, v);

		this.x = w.x;
		this.y = w.y;
	}

	/**
	 * Subtract a vector.
	 * @param v The vector to subtract.
	 */
	subtract(v) {
		let w = Vector.subtract(this, v);

		this.x = w.x;
		this.y = w.y;
	}

	/**
	 * Multiply by a value.
	 * @param value The value to multiply.
	 */
	multiply(value) {
		let v = Vector.multiply(this, value);

		this.x = v.x;
		this.y = v.y;
	}

	/**
	 * Divide by a value.
	 * @param value The value to divide.
	 */
	divide(value) {
		let v = Vector.divide(this, value);

		this.x = v.x;
		this.y = v.y;
	}

	/**
	 * Copy to a new Vector.
	 * @returns {Vector} The copy.
	 */
	copy() {
		return new Vector(this.x, this.y);
	}

	/**
	 * Verify if two vectors are equals (by '==' operator)
	 * @param v The vector to compare
	 * @returns {boolean} True if vectors are equals, false otherwise.
	 */
	equals(v) {
		return this.x == v.x && this.y == v.y;
	}

	/**
	 * Add two vectors
	 * @param v The first vector.
	 * @param w The second vector.
	 * @returns {Vector} The resulting vector.
	 */
	static add(v, w) {
		return new Vector(v.x + w.x, v.y + w.y);
	}

	/**
	 * Subtract two vectors.
	 * @param v The first vector.
	 * @param w The second vector.
	 * @returns {Vector} The resulting vector.
	 */
	static subtract(v, w) {
		return new Vector(v.x - w.x, v.y - w.y);
	}

	/**
	 * Multiply a vector by a value.
	 * @param v The vector.
	 * @param value The value.
	 * @returns {Vector} The resulting vector.
	 */
	static multiply(v, value) {
		return new Vector(v.x*value, v.y*value);
	}

	/**
	 * Divide a vector by a value.
	 * @param v The vector.
	 * @param value The value.
	 * @returns {Vector} The resulting vector.
	 */
	static divide(v, value) {
		return new Vector(v.x/value, v.y/value);
	}
}
