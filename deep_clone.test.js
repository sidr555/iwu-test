/**
 * Author: Dmitry Sidorov
 * Email: sidr@sidora.net
 * Date: 26.09.18
 */

require("./deep_clone");

var obj = {
    "a": [1, 2, 3],
    "b": "",
    "obj": {
        "12": [],
        "obj2" : {
            "arr": []
        }
    }
};

it("shouldn`t be the same object", function(){
    if(obj.deepClone()===obj){
        throw new Error('Is the same object');
    }
});

it("should have the same content", function(){

    // JSON.stringify используется сугубо для целей тестирования ))
    if(JSON.stringify(obj.deepClone())!==JSON.stringify(obj)){
        console.log("obj", JSON.stringify(obj));
        console.log("clone", JSON.stringify(obj.deepClone()));
        throw new Error('The clone differs');
    }
});

