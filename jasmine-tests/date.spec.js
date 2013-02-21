/**
 * This file uses Jasmine as a testing framework and the jasmine-node module.
 * Documentation for jasmine-node can be found at https://github.com/mhevery/jasmine-node
 *
 * Instruction and tutorials for writing jasmine tests can be found at http://pivotal.github.com/jasmine/
 *
 */
describe("Suite of dateRange tests", function() {
    var DateRange = require("../src/dateRange/dateRange");
    it("Tests the construction of dateRange objects", function() {
        var d1 = new Date("2012", "03", "07");
        var d2 = new Date("2012", "04", "01");
        var dr1 = new DateRange(d1, d2);
    });
});