/**
 * This file uses Jasmine as a testing framework and the jasmine-node module.
 * Documentation for jasmine-node can be found at https://github.com/mhevery/jasmine-node
 *
 * Instruction and tutorials for writing jasmine tests can be found at http://pivotal.github.com/jasmine/
 *
 */
describe("Suite of dateRange tests", function() {
    var DateRange = require("../src/dateRange/dateRange.js");
    it("Tests the construction of dateRange objects", function() {
        var errFunction = function () {
            var d1 = new Date("2012", "04", "01");
            var d2 = new Date("2012", "03", "07");
            var dr1 = new DateRange(d1, d2);
        };
        var nonErrFunction = function () {
            var d1 = new Date("2012", "03", "28");
            var d2 = new Date("2012", "04", "01");
            var dr1 = new DateRange(d1, d2);
        }
        expect(errFunction).toThrow("Start date must come before end date");
        expect(nonErrFunction).not.toThrow();
    });
});

describe("Suite of tests for the schedule object", function () {
    var DateRange = require("../src/dateRange/dateRange.js");
    var Schedule = require("../src/schedule/schedule.js");
    it("Tests the sorting function", function() {
        var dr1 = new DateRange(new Date("2012", "03", "03"), new Date("2012", "03", "04"));
        var dr2 = new DateRange(new Date("2012", "05", "03"), new Date("2012", "05", "04"));
        var dr3 = new DateRange(new Date("2012", "04", "03"), new Date("2012", "04", "04"));
        var dr4 = new DateRange(new Date("2012", "02", "03"), new Date("2012", "02", "04"));
        var es1 = new Schedule();

        //Add all the dateRanges. This should automatically sort them as they're being added
        es1.add(dr1);
        es1.add(dr2);
        es1.add(dr3);
        es1.add(dr4);

        //These should now be sorted in the order of 4,1,3,2
        expect(es1.get(0).start == dr4.start && es1.get(0).end == dr4.end).toBe(true);
        expect(es1.get(1).start == dr1.start && es1.get(1).end == dr1.end).toBe(true);
        expect(es1.get(2).start == dr3.start && es1.get(2).end == dr3.end).toBe(true);
        expect(es1.get(3).start == dr2.start && es1.get(3).end == dr2.end).toBe(true);
    });

    it("Tests overlapping dates", function() {
        var dr1 = new DateRange(new Date("2012", "03", "03"), new Date("2012", "03", "04"));
        var dr2 = new DateRange(new Date("2012", "02", "03"), new Date("2012", "05", "04"));
        var es1 = new Schedule();

        var errfn = function() {
            es1.add(dr1);
            es1.add(dr2);
        };

        //Overlapping dateRanges are invalid.
        expect(errfn).toThrow("Date ranges cannot overlap!");
    });

    it("Tests dateRanges with the exact same starting time", function() {
        var dr1 = new DateRange(new Date("2012", "03", "03"), new Date("2012", "03", "04"));
        var dr2 = new DateRange(new Date("2012", "03", "03"), new Date("2012", "03", "04"));
        var es1 = new Schedule();

        var errfn = function() {
            es1.add(dr1);
            es1.add(dr2);
        };

        //A form of overlap, the ranges cannot start at the same time.
        expect(errfn).toThrow("Date ranges cannot have the same start date!");
    });

    it("Tests dateRanges with the exact same ending time", function() {
        var dr1 = new DateRange(new Date("2012", "03", "03"), new Date("2012", "03", "07"));
        var dr2 = new DateRange(new Date("2012", "03", "06"), new Date("2012", "03", "07"));
        var es1 = new Schedule();

        var errfn = function() {
            es1.add(dr1);
            es1.add(dr2);
        };

        //A form of overlap, the ranges cannot end at the same time.
        expect(errfn).toThrow("Date ranges cannot have the same end date!");
    });

});