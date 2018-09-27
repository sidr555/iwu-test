/**
 * Author: Dmitry Sidorov
 * Email: sidr@sidora.net
 * Date: 26.09.18
 */

module.exports.checkBraces = function(str){
    while(1) {
        //console.log("mask braces:", str);
        var masked = str.replace(/{[^{}<>\[\]\(\)]*}/, "_B1_")
            .replace(/<[^{}<>\[\]\(\)]*>/, "_B2_")
            .replace(/\[[^{}<>\[\]\(\)]*\]/, "_B3_")
            .replace(/\([^{}<>\[\]\(\)]*\)/, "_B4_");

        if (masked === str) {
            break;
        }
        str = masked;
    }

    return str.match(/[<>{}\[\]\(\)]/) ? 1 : 0;
};