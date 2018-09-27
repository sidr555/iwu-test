/**
 * Author: Dmitry Sidorov
 * Email: sidr@sidora.net
 * Date: 27.09.18
 */

function func(s, a, b) {

    if (s.match(/^$/)) {
        return -1;
    }

    var i = s.length -1;
    var aIndex =     -1;
    var bIndex =     -1;

    while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {
        if (s.substring(i, i +1) == a) {
            aIndex = i;
        }
        if (s.substring(i, i +1) == b) {
            bIndex = i;
        }
        i = i - 1;
    }

    if (aIndex != -1) {
        if (bIndex == -1) {
            return aIndex;
        }
        else {
            return Math.max(aIndex, bIndex);
        }
    }

    if (bIndex != -1) {
        return bIndex;
    }
    else {
        return -1;
    }
}


function refactored_func(s, a, b) {

    if (s === '') {
        return -1;
    }

    var aIndex = s.lastIndexOf(a);
    var bIndex = s.lastIndexOf(b);

    if (aIndex >= 0 && bIndex >= 0) {
        return Math.max(aIndex, bIndex);
    }

    return aIndex >= 0 ? aIndex : bIndex;
}