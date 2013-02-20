/**
 * Some simple functions that add some nice functionality to Javascript's default String class.
 * These functions are added to the default String class and can be called on native String objects.
 */
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(this.length - str.length, this.length) == str;
    };
}
