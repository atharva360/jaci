# jaci
a plugin for creating CLI user-input as promises for node.js

## Installation
``` npm install jaci --save ```

Then initialize using 

``` 
const jaci = require("jaci"); 
```

## Method
### string(question,[option])
Accept all kind of user input
### password(question,[option])
Accept all kind of user input but hide it
### alpha(question,[option])
only accept alphabet character
### alphanum(question,[option])
only accept alphanumeric character
### number(question,[option])
only accept number
### regex(question,[option])
set your own regex to test user input, please refer to option below.
### done()
finish reading user input, you have to call this method at the end of your promise chain/catch to exit the prompt.

## Options
- option.default[string][optional], the default value if user did not enter anything
- option.required[boolean][optional][default:true], if this is set to ``` false ``` then user won't be asked again if they did not input anything
- option.reject[string][optional],reject user input if the input contain any of the character you set here
- option.min[integer][optional][default:0], set minimum length (minimum value for ```number``` method) of user input, if it's ```0``` then there is no minimum;
- option.max[integer][optional][default:0], set maximum length (maximum value for ```number``` method) of user input, if it's ```0``` then there is no maximum;
- option.muted[boolean][optional][default:false(true for ```password``` method], hide user input
- option.confirm[object][optional][default:{true:'Y',false:'N'}], only available for ```confirm``` method, you can set how user answer your true/false question.
- option.regex[regex][required],only available for ```regex``` method.

## Example
```
const jaci = require("jaci");
jaci.string("string : ",{required:false})
.then((res)=>{
    console.log(res);
    return jaci.password("password :")
})
.then((res)=>{
    console.log(res);
    return jaci.alpha("alpha :")
})
.then((res)=>{
    console.log(res);
    return jaci.alphanum("alphanum :")
})
.then((res)=>{
    console.log(res);
    return jaci.number("number :")
})
.then((res)=>{
    console.log(res);
    return jaci.regex("regex:",{regex:/^[A-Za-z]+$/})
})
.then((res)=>{
    console.log(res);
    return jaci.confirm("confirm (Yea/Nay):",{confirm:{true:"Y",false:"N"}})
})
.then((res)=>{
    console.log(res);
    jaci.done();
    return;
})
.catch((e)=>{
    console.log("error",e);
    jaci.done();
})
```
