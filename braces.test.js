/**
 * Author: Dmitry Sidorov
 * Email: sidr@sidora.net
 * Date: 27.09.18
 */

var braces = require("./braces");

it("should be 0 checkBraces('---(++++)----')", function(){
    const expectedResult = 0;
    const result = braces.checkBraces("---(++++)----");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 0 checkBraces('')", function(){
    const expectedResult = 0;
    const result = braces.checkBraces("");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 0 checkBraces('before ( middle []) after ')", function(){
    const expectedResult = 0;
    const result = braces.checkBraces("before ( middle []) after ");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 non zero checkBraces(') (')", function(){
    const expectedResult = 1;
    const result = braces.checkBraces(") (");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 checkBraces('} {')", function(){
    const expectedResult = 1;
    const result = braces.checkBraces("} {");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 checkBraces('<(   >)')", function(){
    const expectedResult = 1;
    const result = braces.checkBraces("<(   >)");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be zero checkBraces('(  [  <>  ()  ]  <>  )')", function(){
    const expectedResult = 0;
    const result = braces.checkBraces("(  [  <>  ()  ]  <>  )");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

it("should be 1 checkBraces('   (      [)')", function(){
    const expectedResult = 1;
    const result = braces.checkBraces("   (      [)");
    if(result!==expectedResult){
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});

