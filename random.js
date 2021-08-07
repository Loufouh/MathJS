"use strict";

/**
 * Pick a random integer between two values.
 * @param min The lower boundary.
 * @param max The higher boundary.
 * @returns {number} The random integer.
 */
function randomInt(min, max) {
	return Math.floor(random(min, max));
}

/**
 * Pick a random value between two values.
 * @param min The lower boundary.
 * @param max The hihger boundary.
 * @returns {any} The  random value.
 */
function random(min, max) {
	return Math.random() * (max - min) + min; 
}
