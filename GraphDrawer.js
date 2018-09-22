"use strict";

class GraphDrawer {
	constructor(canvas) {
		if(canvas === undefined)
			return error("canvas is undefined !");

		this.canvas = canvas;
		this.context = canvas.getContext("2d");

		this.func = (x)=>0;
		this.funcColor = Color.rgb(0, 0);
		this.funcRange = new Vector(-Infinity, Infinity);

		this.widthRange = new Vector(-100, 100);
		this.heightRange = new Vector(-100, 100);

		this.gridScale = new Vector(5, 5);

		this.resolution = 1;

		this.isDrawGrid = true;
		this.isDrawXAxis = true;
		this.isDrawYAxis = true;
	}

	draw() {
		this.drawGrid();
		this.drawAxis();
		this.drawCurve();
	}
	
	drawGrid() {
		if(this.isDrawGrid) {
			strokeWeight(0.2)
			stroke(Color.rgb(160));
			grid(new Vector(0, 0), new Vector(this.gridScale.x*canvas.width/(this.widthRange.y - this.widthRange.x), this.gridScale.y*canvas.height/(this.heightRange.y - this.heightRange.x)), 
			     new Vector(0, 0), new Vector(this.canvas.width, this.canvas.height), this.context);
		}
	}

	drawAxis() {
		strokeWeight(2);
		stroke(Color.rgb(255, 110, 110));

		let originPos = this.getAbsolutePos(new Vector(0, 0));

		// If draw x axis is activated and it is in screen range
		if(this.isDrawXAxis && this.heightRange.x <= 0 && this.heightRange.y >= 0)
			line(0, originPos.y, canvas.width, originPos.y, this.context);

		// If draw y axis is activated and it is in screen range
		if(this.isDrawYAxis && this.widthRange.x <= 0 && this.widthRange.y >= 0)
			line(originPos.x, 0, originPos.x, canvas.height, this.context);
	}

	drawCurve() {
		let drawRange = new Vector( (this.funcRange.x > this.widthRange.x) ? this.funcRange.x : this.widthRange.x,
					    (this.funcRange.y < this.widthRange.y) ? this.func.Range.y : this.widthRange.y);

		let currentPoint = this.getAbsolutePos( new Vector(drawRange.x, this.func(drawRange.x)) );

		strokeWeight(2);
		stroke(Color.rgb(110, 255, 110));

		for(let i = drawRange.x + this.resolution; i < drawRange.y + this.resolution; i += this.resolution) {
			let lastPoint = currentPoint;
			currentPoint = this.getAbsolutePos( new Vector(i, this.func(i)) );

			line(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y, this.context);
		}
		
	}

	setWidthRange(min, max) {
		this.widthRange = new Vector(min, max);
	}

	setHeightRange(min, max) {
		this.heightRange = new Vector(min, max);
	}

	getAbsolutePos(pos) {
		return new Vector(Math.map(pos.x, this.widthRange.x, this.widthRange.y, 0, canvas.width),
				  Math.map(pos.y, this.heightRange.x, this.heightRange.y, canvas.height, 0));
	}

	setFunction(func, color=Color.rgb(0)) {
		this.func = func;
		this.funcColor = color;
	}

	setFunctionRange(min, max=Infinity) {
		this.funcRange = new Vector(min, max);
	}

	setGridScale(x, y) {
		this.gridScale = new Vector(x, y);
	}

	setResolution(resolution) {
		this.resolution = resolution;
	}

	setDrawGrid(isDrawGrid) {
		this.isDrawGrid = isDrawGrid;
	}

	setDrawXAxis(isDrawXAxis) {
		this.isDrawXAxis = isDrawXAxis;
	}

	setDrawYAxis(isDrawYAxis) {
		this.isDrawYAxis = isDrawYAxis;
	}
}
