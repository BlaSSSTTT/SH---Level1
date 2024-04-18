if (process.argv.length != 4) {
    console.log(process.argv)
	console.log("usage: node tester.js <tasknum> <path/to/taskN.js>\nexample: node tester.js 1 t1.js\n");
    process.exit(1);
}

const inputs = {
    1: `GET uri=/sum?nums=1,2,3
    HOST: shpp.me
    Accept: image/gif, image/jpeg, */*
    Accept-Language: en-us
    Accept-Encoding: gzip, deflate
    User-Agent: Mozilla/4.0
    Content-Length: 35`
}

// =============================================== ANSWERS

answers = {
	1: `HTTP/1.1 200 OK
    Date: Sun, 18 Oct 2012 10:36:20 GMT -- тут поточний час
    Server: Apache/2.2.14 (Win32)
    Content-Length: 1
    Connection: Closed
    Content-Type: text/html; charset=utf-8
    
    6`,
}

const execSync = exports.execSync = (cmd, input) => {
    try {
        return "" + require('child_process').execSync(cmd, {input});
    } catch (e) {
        return undefined;
    }
};

let res = execSync("node "+process.argv[3], inputs[process.argv[2]]);
console.log(`got: 
=======================
${res}
=======================
`);
res = res.replace(/Date:[^\n]+\n/, "").replace(/[\n\r]+$/, "");

if (res === answers[process.argv[2]])
    console.log("OK");
else
    console.log("mismatch, was waiting for response like: \n"+answers[process.argv[2]]);

