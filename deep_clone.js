/**
 * Author: Dmitry Sidorov
 * Email: sidr@sidora.net
 * Date: 26.09.18
 */

Object.prototype.deepClone = function() {
    var obj = this;
    var result = typeof obj.length === "undefined" ? {} : [];

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)){
            if (typeof obj[prop] === 'object') {
                result[prop] = obj[prop].deepClone();
            } else {
                result[prop] = obj[prop];
            }
        }
    }
    return result;
};

