const jaci = require("./index");
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