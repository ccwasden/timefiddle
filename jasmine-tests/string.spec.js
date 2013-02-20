/**
 * This file uses Jasmine as a testing framework and the jasmine-node module.
 * Documentation for jasmine-node can be found at https://github.com/mhevery/jasmine-node
 *
 * Instruction and tutorials for writing jasmine tests can be found at http://pivotal.github.com/jasmine/
 *
 */
describe("Custom String functions test", function() {
    require("../src/string/string");
    it("Tests the implementation of string.startsWith()", function() {
        expect('something'.startsWith('some')).toBe(true);
        expect('api.timefiddle.com'.startsWith('api.timefiddle')).toBe(true);
        expect('api.timefiddle.com'.startsWith('m.timefiddle')).toBe(false);
    });
    it("Tests the implementation of string.endsWith()", function() {
        expect('something'.endsWith('thing')).toBe(true);
        expect('api.timefiddle.com'.endsWith('.com')).toBe(true);
        expect('api.timefiddle.com'.endsWith('.net')).toBe(false);
    });
});