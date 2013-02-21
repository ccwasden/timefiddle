/**
 * Represents a range of dates consisting of a start date and an end date.
 * The only constraints enforced are that the end date must come after the start date
 */

function dateRange(start, end) {
    if(start instanceof Date && end instanceof Date) {
        if(start < end) {
            this.start = start;
            this.end = end;
        } else {
            throw "Start date must come before end date";
        }
    } else {
        throw "You must build a dateRange from Date objects"
    }
};

module.exports = dateRange;