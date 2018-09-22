"use strict";

Math.map = function (x, inMin, inMax, outMin, outMax) {
	return (x - inMin)*(outMax - outMin)/(inMax - inMin) + outMin;
} 
