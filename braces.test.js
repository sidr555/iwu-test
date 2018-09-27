/**
 * Author: Dmitry Sidorov
 * Email: sidr@sidora.net
 * Date: 27.09.18
 */

var braces = require("./braces");

it("should be 0 checkBraces('---(++++)----')", function(){
    var expectedResult = 0;
    var result = braces.checkBraces("---(++++)----");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 0 checkBraces('')", function(){
    var expectedResult = 0;
    var result = braces.checkBraces("");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 0 checkBraces('before ( middle []) after ')", function(){
    var expectedResult = 0;
    var result = braces.checkBraces("before ( middle []) after ");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 non zero checkBraces(') (')", function(){
    var expectedResult = 1;
    var result = braces.checkBraces(") (");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 checkBraces('} {')", function(){
    var expectedResult = 1;
    var result = braces.checkBraces("} {");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 checkBraces('<(   >)')", function(){
    var expectedResult = 1;
    var result = braces.checkBraces("<(   >)");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be zero checkBraces('(  [  <>  ()  ]  <>  )')", function(){
    var expectedResult = 0;
    var result = braces.checkBraces("(  [  <>  ()  ]  <>  )");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 checkBraces('   (      [)')", function(){
    var expectedResult = 1;
    var result = braces.checkBraces("   (      [)");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

