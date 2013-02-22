var dateRange = require("../dateRange/dateRange.js");

/**
 * Basically a wrapper around an array of dateRange objects.
 * Ensures that all dateRanges in the object do not overlap at all
 */
function schedule() {
    this.ranges = [];
};

/**
 * Sorts the internal dateRanges by their start date.
 */
schedule.prototype.sort = function() {
    this.ranges.sort(function(a,b) {
        return a.start - b.start;
    });
};

/**
 * Validates the dateRange entries by:
 *  1) Checking for duplicate start and/or end dates
 *  2) Checking for overlap of dateRanges (does one dateRange start before the previous one has ended)
 * @throws Error if the validation fails
 */
schedule.prototype.validate = function() {
    this.sort();
    for(var i = 0; i < this.ranges.length - 1; i++) {
        var a = this.ranges[i];
        var b = this.ranges[i+1];
        if(a.start == b.start) {
            throw "Date ranges cannot have the same start date!";
        }
        if(a.end == b.end) {
            throw "Date ranges cannot have the same end date!";
        }
        if(a.start > b.start) {
            throw "Sorting failed! " + a.start + " is greater than " + b.start;
        }
        if(a.end > b.end) {
            throw "Date ranges cannot overlap!";
        }
    }
};

/**
 * Adds a dateRange to the collection of dateRanges.
 * Ensures that it will be sorted according to the start time of each dateRange after each addition.
 * Throws an error if the given range overlaps with any other ranges in the collection.
 *
 * @param range The dateRange to add to the collection
 * @throws Error if the given range overlaps with any other
 */
schedule.prototype.add = function(range) {
    if(range instanceof dateRange) {

        //TODO find a better implementation for this
        this.ranges.push(range);

        //Sort and check for overlap here
        this.validate();

    } else {
        throw "You can only put dateRange objects into a schedule!";
    }
};

/**
 * Simple getter method that returns the dateRange at the specific zero-based index
 * @param index The index of the dateRange to return
 */
schedule.prototype.get = function(index) {
    return this.ranges[index];
};

module.exports = schedule;