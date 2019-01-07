"use strict";

class Matrix {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.data = Array.from({length: height}, () => new Array(width).fill(0));
	}
	
	transpose() {
		let res = new Matrix(this.height, this.width);
		return res.map((object, x, y)=>this.get(y, x));
	}

	randomizeInt(min, max) {
		return this.randomize(randomInt, min, max);
	}

	randomizeFloat(min, max) {
		return this.randomize(randomFloat, min, max);
	}

	randomize(randomFunc, min, max) {
		return this.map(()=>randomFunc(min, max));
	}

	fill(object) {
		return this.map(()=>object);
	}

	get(x, y) {
		return this.data[y][x];
	}

	set(x, y, object) {
		this.data[y][x] = object;
	}

	display() {
		console.table(this.data);
	}

	toArray() {
		let array = Array.from({length: this.width*this.height});
		return array.map((value, x)=>this.get(x - Math.floor(x/this.width)*this.width, Math.floor(x/this.width)));
	}

	map(func) {
		let res = new Matrix(this.width, this.height);
		res.data = this.data.map((row, y)=>row.map((value, x)=>func(value, x, y)));
		return res;
	}

	add(object) {
		return Matrix.add(this, object);
	}

	substract(object) {
		return Matrix.substract(this, object)
	}

	multiply(object) {
		return Matrix.multiply(this, object);
	}

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
