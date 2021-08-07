"use strict";

class Matrix {
	/**
	 *
	 * @param width The width.
	 * @param height The height.
	 */
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.data = Array.from(
			{length: height},
			() => new Array(width).fill(0)
		);
	}

	/**
     * Transpose.
	 * @returns {Matrix} The transposition.
	 */
	transpose() {
		let res = new Matrix(this.height, this.width);
		return res.map((object, x, y)=>this.get(y, x));
	}

	/**
	 * Fill with random intergers.
	 * @param min The minimum possible integer.
	 * @param max The maximum possible integer.
	 * @returns {Matrix} The randomized matrix.
	 */
	randomizeInt(min, max) {
		return this.randomize(randomInt, min, max);
	}

	/**
	 * Fill with random floats.
	 * @param min The minimum possible float.
	 * @param max The maximum possible float.
	 * @returns {Matrix} The randomized matrix.
	 */
	randomizeFloat(min, max) {
		return this.randomize(randomFloat, min, max);
	}

	/**
	 * Fill with random values.
	 * @param randomFunc The function that generates random values.
	 * @param min The minimum possible value.
	 * @param max The maximum possible value.
	 * @returns {Matrix}
	 */
	randomize(randomFunc, min, max) {
		return this.map(()=>randomFunc(min, max));
	}

	/**
	 * Fill with one object
	 * @param object The object.
	 * @returns {Matrix} The filled matrix.
	 */
	fill(object) {
		return this.map(()=>object);
	}

	/**
	 * Get a value
	 * @param x The column index.
	 * @param y The row index.
	 * @returns {any} The value.
	 */
	get(x, y) {
		return this.data[y][x];
	}

	/**
	 * Set value
	 * @param x The column index.
	 * @param y The row index.
	 * @param object The value.
	 */
	set(x, y, object) {
		this.data[y][x] = object;
	}

	/**
	 * Log the matrix in the console.
	 */
	display() {
		console.table(this.data);
	}

	/**
	 * Convert to an array.
	 * @returns {*[]} The array.
	 */
	toArray() {
		let array = Array.from({length: this.width*this.height});
		return array.map((value, x)=>this.get(x - Math.floor(x/this.width)*this.width, Math.floor(x/this.width)));
	}

	/**
	 * Apply a fonction on each value.
	 * @param func The function to apply.
	 * @returns {Matrix} The new matrix.
	 */
	map(func) {
		let res = new Matrix(this.width, this.height);
		res.data = this.data.map((row, y)=>row.map((value, x)=>func(value, x, y)));
		return res;
	}

	/**
	 * Add two matrices or a value to each matrix's components.
	 * @param object The object to add (a matrix or a value).
	 * @returns {Matrix|*} The new matrix.
	 */
	add(object) {
		return Matrix.add(this, object);
	}

	/**
	 * Subtract two matrices or a value to each matrix's components.
	 * @param object The object to subtract (a matrix or a value).
	 * @returns {Matrix|*} The new matrix.
	 */
	subtract(object) {
		return Matrix.substract(this, object)
	}

	/**
	 * Multiply two matrices or a value to each matrix's components.
	 * @param object The object to multiply (a matrix or a value).
	 * @returns {Matrix|*} The new matrix.
	 */
	multiply(object) {
		return Matrix.multiply(this, object);
	}

	/**
	 * Divide two matrices or a value to each matrix's components.
	 * @param object The object to divide (a matrix or a value).
	 * @returns {Matrix|*} The new matrix.
	 */
	divide(object) {
		return Matrix.divide(this, object);
	}

	product(matrix) {
		return Matrix.product(this, matrix);
	}

	static fromArray(array) {
		let res = new Matrix(1, array.length);
		return res.map((value, x, y)=>array[y]);
	}

	static add(matrix, object) {
		if(object instanceof Matrix)
			return Matrix.simpleFusion(matrix, object, (a, b)=>a + b);
		else
			return matrix.map(value=>value + object);
	}

	static substract(matrix, object) {
		if(object instanceof Matrix)
			return Matrix.simpleFusion(matrix, object, (a, b)=>a - b);
		else
			return matrix.map(value=>value - object);
	}

	static multiply(matrix, object) {
		if(object instanceof Matrix)
			return Matrix.simpleFusion(matrix, object, (a, b)=>a*b);
		else
			return matrix.map(value=>value*object);
	}

	static divide(matrix, object) {
		if(object instanceof Matrix)
			return Matrix.simpleFusion(matrix, object, (a, b)=>a/b);
		else
			return matrix.map(value=>value/object);
	}

	static product(matrix1, matrix2) {
		if(matrix1.width != matrix2.height) {
			console.error("These matrices can't be multiplied !");
			return undefined;
		}
		
		function productElementOfMatrix(matrix1, matrix2, x, y) {
			let sum = 0;

			for(let i = 0; i < matrix1.width; i++)
				sum += matrix1.get(i, y)*matrix2.get(x, i);
			return sum;

		}
		return  Matrix.fusion(matrix1, matrix2, productElementOfMatrix, matrix2.width, matrix1.height); 
	}

	static simpleFusion(matrix1, matrix2, func) {
		return Matrix.fusion(matrix1, matrix2, (matrix1, matrix2, x, y)=>func(matrix1.get(x, y), matrix2.get(x, y)));
	}

	static fusion(matrix1, matrix2, func, resWidth=matrix1.width, resHeight=matrix1.height) {
		let res = new Matrix(resWidth, resHeight);
		return res.map((value, x, y)=>func(matrix1, matrix2, x, y));
	}
}
