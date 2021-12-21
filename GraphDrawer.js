"use strict";

/**
 * A canvas's graph drawer (requires DrawJS)
 */
export class GraphDrawer {
    /**
     * The constructor.
     * @param canvas The canvas on which to draw.
     */
    constructor(canvas) {
        if (canvas === undefined)
            return error("canvas is undefined !");

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.func = (x) => 0;
        this.funcColor = Color.rgb(0, 0);
        this.funcRange = new Vector(-Infinity, Infinity);

        this.widthRange = new Vector(-100, 100);
        this.heightRange = new Vector(-100, 100);

        this.gridScale = new Vector(5, 5);

        this.resolution = 1;

        this.drawGrid = true;
        this.drawXAxis = true;
        this.drawYAxis = true;
    }

    /**
     * Draw the graph.
     */
    draw() {
        this.drawGrid();
        this.drawAxis();
        this.drawCurve();
    }

    /**
     * Draw the grid.
     */
    drawGrid() {
        if (this.drawGrid) {
            strokeWeight(0.2)
            stroke(Color.rgb(160));
            grid(
                new Vector(0, 0),
                new Vector(
                    this.gridScale.x * canvas.width / (this.widthRange.y - this.widthRange.x),
                    this.gridScale.y * canvas.height / (this.heightRange.y - this.heightRange.x)
                ),
                new Vector(0, 0),
                new Vector(this.canvas.width, this.canvas.height),
                this.context
            );
        }
    }

    /**
     * Draw the axis.
     */
    drawAxis() {
        strokeWeight(2);
        stroke(Color.rgb(255, 110, 110));

        let originPos = this.getAbsolutePos(new Vector(0, 0));

        // If draw x axis is activated and it is in screen range
        if (
            this.drawXAxis
            && this.heightRange.x <= 0
            && this.heightRange.y >= 0
        ) {
            line(
                0,
                originPos.y,
                canvas.width,
                originPos.y,
                this.context
            );
        }

        // If draw y axis is activated and it is in screen range
        if (
            this.drawYAxis
            && this.widthRange.x <= 0
            && this.widthRange.y >= 0
        ) {
            line(
                originPos.x,
                0,
                originPos.x,
                canvas.height,
                this.context
            );
        }
    }

    /**
     * Draw the function curve.
     */
    drawCurve() {
        let drawRange = new Vector(
            (this.funcRange.x > this.widthRange.x) ? this.funcRange.x : this.widthRange.x,
            (this.funcRange.y < this.widthRange.y) ? this.funcRange.y : this.widthRange.y
        );

        let currentPoint = this.getAbsolutePos(
            new Vector(
                drawRange.x,
                this.func(drawRange.x)
            )
        );

        strokeWeight(2);
        stroke(Color.rgb(110, 255, 110));

        for (
            let i = drawRange.x + this.resolution;
            i < drawRange.y + this.resolution;
            i += this.resolution
        ) {
            let lastPoint = currentPoint;
            currentPoint = this.getAbsolutePos(
                new Vector(
                    i,
                    this.func(i)
                )
            );

            line(
                lastPoint.x,
                lastPoint.y,
                currentPoint.x,
                currentPoint.y,
                this.context
            );
        }
    }

    /**
     * Change the change of the width.
     *
     * @param min The lower boundary.
     * @param max The higher boundary.
     */
    setWidthRange(min, max) {
        this.widthRange = new Vector(min, max);
    }

    /**
     * Change the change of the height.
     *
     * @param min The lower boundary.
     * @param max The higher boundary.
     */
    setHeightRange(min, max) {
        this.heightRange = new Vector(min, max);
    }

    /**
     * Calculate the position on the canvas from the position on the graph.
     * @param pos A Vector that represents the position on the graph.
     * @returns {Vector} A Vector that represents the position on the canvas.
     */
    getAbsolutePos(pos) {
        return new Vector(
            Math.map(
                pos.x,
                this.widthRange.x,
                this.widthRange.y,
                0,
                canvas.width
            ),
            Math.map(
                pos.y,
                this.heightRange.x,
                this.heightRange.y,
                canvas.height,
                0
            )
        );
    }

    /**
     * Change the function to draw.
     * @param func The function to draw (a function that takes an X and return a Y)
     * @param color The color of the curve (black if not specified)
     */
    setFunction(func, color = Color.rgb(0)) {
        this.func = func;
        this.funcColor = color;
    }

    /**
     * Set the function range.
     * @param min The lower boundary
     * @param max The higher boundary
     */
    setFunctionRange(min, max = Infinity) {
        this.funcRange = new Vector(min, max);
    }

    /**
     * Set the grid scale
     * @param x The horizontal scaling value.
     * @param y The vertical scaling value.
     */
    setGridScale(x, y) {
        this.gridScale = new Vector(x, y);
    }

    /**
     * Set the resolution of the function's curve
     * @param resolution The horizontal distance between each point of the curve.
     */
    setResolution(resolution) {
        this.resolution = resolution;
    }

    /**
     * Specify if we want to draw the grid.
     * @param drawGrid True in order to draw it, false otherwise.
     */
    setDrawGrid(drawGrid) {
        this.drawGrid = drawGrid;
    }

    /**
     * Specify if we want to draw the X axis.
     * @param drawXAxis True in order to draw it, false otherwise
     */
    setDrawXAxis(drawXAxis) {
        this.drawXAxis = drawXAxis;
    }

    /**
     * Specify if we want to draw the Y axis.
     * @param drawYAxis True in order to draw it, false otherwise
     */
    setDrawYAxis(drawYAxis) {
        this.drawYAxis = drawYAxis;
    }
}
