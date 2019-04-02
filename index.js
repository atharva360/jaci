const readline = require('readline');
let DEFAULT_CONFIG ={
    type:"string",
    max:0,
    min:0,
    reject:false,
    required:false,
    confirm:{true:"Y",false:"n"},
    default:false,
    muted:false,
}
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
});
const jaci=()=>{
    const testDefault=(str,conf)=>{
        if(conf.default===false){
            return new Error('no default set');
        }
        if(!str || str==""){
            return conf.default;
        }
        return new Error('no default set');;
    }
    const testRequired=(str,conf)=>{
        if(conf.require===false){
            return str;
        }
        if(!str || str ==""){
            return new Error('Required but no value');
        }
        return str;
    }
    const testReject=(str,conf)=>{
        if(!conf.reject){
            return str;
        }
        let lst = conf.reject.split("");
        let rejected = false;
        lst.forEach((v)=>{
            if(str.indexOf(v)>=0){
                rejected=true;
            }
        })
        if(rejected===true){
            return new Error('Rejected character exists');
        }
        return str;
    }
    const testAlpha=(str,conf)=>{
        var letters = /^[A-Za-z]+$/;
        if(!str.match(letters)){
            return new Error('Please input only letters');
        }
        return str;
    }
    const testAlphanum = (str,conf)=>{
        var letters = /^[0-9a-zA-Z]+$/;
        if(!str.match(letters)){
            return new Error('Please input only letters and number');
        }
        return str;
    }
    const testLength=(str,conf)=>{
        if(conf.type==="number" || conf.type==="confirm"){
            return str;
        }
        if(conf.min> 0 && str.length < conf.min){
            return new Error('string is too short');
        }
        if(conf.max && str.length > conf.max){
            return new Error('string is too long');
        }
        return str;
    }
    const testNumber=(str,conf)=>{
        let num = Number(str);
        if(isNaN(num)){
            return new Error('not a number');
        }
        if(conf.min> 0 && num < conf.min){
            return new Error('number too small');
        }
        if(conf.max>0 && num > conf.max){
            return new Error('number too big');
        }
        return num;
    }
    const testConfirm=(str,conf)=>{
        try{
            if(str.toLowerCase()==conf.confirm.true.toLowerCase()){
                return true
            }
            if(str.toLowerCase()==conf.confirm.false.toLowerCase()){
                return false
            }
            return new Error('unknown option');
        }catch(e){
            return new Error('unknown option');
        }
    }
    const testRegex=(str,conf)=>{
        if(!str.match(conf.regex)){
            return new Error('not match');
        }
        return str;
    }
    const test = (str,conf)=>{
        let result = testDefault(str,conf);
        if(!(result instanceof Error)){
            return result;
        }
        result = testRequired(str,conf);
        if(result instanceof Error){
            return result;
        }
        result = testReject(str,conf);
        if(result instanceof Error){
            return result;
        }
        result = testLength(str,conf);
        if(result instanceof Error){
            return result;
        }

        if(conf.type=="number"){
            result = testNumber(str,conf);
        }
        if(conf.type=="confirm"){
            result = testConfirm(str,conf);
        }
        if(conf.type=="alpha"){
            result = testAlpha(str,conf);
        }
        if(conf.type=="alphanum"){
            result = testAlphanum(str,conf);
        }
        if(conf.type=="regex"){
            result = testRegex(str,conf);
        }
        return result;
    }
    const ask=(q,c,cb)=>{
        const stdin = process.openStdin();
        const onDataHandler=(char)=>{
                char = char + '';
                switch (char) {
                case '\n':
                case '\r':
                case '\u0004':
                    stdin.removeListener("data",onDataHandler); 
                    stdin.pause();
                    break;
                default:
                    process.stdout.clearLine();
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(q + Array(rl.line.length + 1).join('*'));
                    break;
                }
        }
        if(c.muted===true){
            process.stdin.on('data',onDataHandler);
        }
        rl.question(q, (a) => {
            let result = test(a,c);
            stdin.removeListener("data",onDataHandler); 
            rl.history = rl.history.slice(1);
            if(result instanceof Error){
                ask(q,c,cb)
                return;
            }
            cb(result);
        });
    }

    const confirm=(question,conf)=>{
        if(!conf){
            conf = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
        return new Promise((resolve,reject)=>{
            try{
                conf.type="confirm";
                ask(question,conf,(res)=>{
                    resolve(res)
                })
            }catch(e){
                reject(e);
            }
         })
    }
    const number=(question,conf)=>{
        if(!conf){
            conf = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
        return new Promise((resolve,reject)=>{
            try{
                conf.type="number";
                ask(question,conf,(res)=>{
                    resolve(res)
                })
            }catch(e){
                reject(e);
            }
         })
    }
    const string=(question,conf)=>{
        if(!conf){
            conf = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
        return new Promise((resolve,reject)=>{
            try{
                
                conf.type="string";
                ask(question,conf,(res)=>{
                    resolve(res)
                })
            }catch(e){
                reject(e);
            }
         })
    }
    const alpha=(question,conf)=>{
        if(!conf){
            conf = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
        return new Promise((resolve,reject)=>{
            try{
                
                conf.type="alpha";
                ask(question,conf,(res)=>{
                    resolve(res)
                })
            }catch(e){
                reject(e);
            }
         })
    }
    const alphanum=(question,conf)=>{
        if(!conf){
            conf = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
        return new Promise((resolve,reject)=>{
            try{
                
                conf.type="alphanum";
                ask(question,conf,(res)=>{
                    resolve(res)
                })
            }catch(e){
                reject(e);
            }
         })
    }
    const password=(question,conf)=>{
        if(!conf){
            conf = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
        }
        return new Promise((resolve,reject)=>{
            try{
                conf.muted = true;
                ask(question,conf,(res)=>{
                    resolve(res)
                })
            }catch(e){
                reject(e);
            }
        })
    }
    const regex = (question,conf)=>{
        if(!conf || !conf.regex){
            console.log(conf);
            return new Error(" no regex pattern defined");
        }
        conf.type="regex";
        return new Promise((resolve,reject)=>{
            try{
                ask(question,conf,(res)=>{
                    resolve(res)
                })
            }catch(e){
                reject(e);
            }
        })
    }
    const done=()=>{
        rl.close();
    }
    return {
        regex:regex,
        done:done,
        password:password,
        alpha:alpha,
        alphanum:alphanum,
        string:string,
        number:number,
        confirm:confirm
    }
}
module.exports = jaci();