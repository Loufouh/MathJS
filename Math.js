"use strict";

/**
 * Map a value from an interval into another.
 * @param x The value to map.
 * @param inMin The lower boundary of the starting interval.
 * @param inMax The higher boundary of the starting interval.
 * @param outMin The lower boundary of the ending interval.
 * @param outMax The higher boundary of the ending interval.
 * @returns {*} The mapped value.
 */
Math.map = function (x, inMin, inMax, outMin, outMax) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
} 
