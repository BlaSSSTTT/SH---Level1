const { url } = require("inspector");
function getCurrentDateFormatted() {
    // Масив з короткими назвами днів тижня
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Масив з короткими назвами місяців
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Отримуємо поточну дату та час
    let currentDate = new Date();

    // Отримуємо номер дня тижня (від 0 до 6)
    let dayOfWeekNumber = currentDate.getDay();

    // Отримуємо коротку назву дня тижня
    let shortDayOfWeek = daysOfWeek[dayOfWeekNumber];

    // Формуємо поточну дату у вказаному форматі
    let formattedDate = shortDayOfWeek + ', ' +
                        currentDate.getDate() + ' ' +
                        months[currentDate.getMonth()] + ' ' +
                        currentDate.getFullYear() + ' ' +
                        currentDate.getHours() + ':' +
                        currentDate.getMinutes() + ':' +
                        currentDate.getSeconds() + ' GMT';

    return formattedDate;
}

function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}
   
   let contents = readHttpLikeInput();
   
   function outputHttpResponse(statusCode, statusMessage, headers, body) {
       console.log("HTTP/1.1 "+statusCode+" "+statusMessage+"\n"+headers+"\n"+body);
   }
   
   function processHttpRequest($method, $uri, $headers, $body) {
       let statusCode = 200;
       let statusMessage = "OK";       
       if($method!=="GET"){
            statusCode=400;
            statusMessage = "Bad Request";
            $body = "not GET request";
       }else {
            let hostString = $headers.find(str => str.startsWith("Host")).replace("Host: ", "");
            let path="";
            if(hostString.startsWith("student.shpp.me")){
                path = "student";
            }else if(hostString.startsWith("another.shpp.me")){
                path = "another";
            }else{                
                let statusCode = 403;
                let statusMessage = "Not correct directory";
                $headers = "Date: "+getCurrentDateFormatted()+"\n"+
                "Server: Apache/2.2.14 (Win32)\n"+ 
                "Content-Length: " + $body.toString().length+"\n"+                       
                "Connection: Closed\n"+
                "Content-Type: text/html; charset=utf-8\n"
                ;
                outputHttpResponse(statusCode, statusMessage, $headers,$body);
                return;
            }
            const fs = require("fs");

            try {
                const info = fs.readFileSync(path+$uri, "utf8");
                
                $body = info;
            } catch (err) {
                statusCode=404;
                statusMessage = "File not fond";
                $body = "file not found";
            }           
        }
        $headers = "Date: "+getCurrentDateFormatted()+"\n"+
        "Server: Apache/2.2.14 (Win32)\n"+ 
        "Content-Length: " + $body.toString().length+"\n"+                       
        "Connection: Closed\n"+
        "Content-Type: text/html; charset=utf-8\n"
        ;
       outputHttpResponse(statusCode, statusMessage, $headers,$body);
   }
   
   function parseTcpStringAsHttpRequest(string) { 
    let strings = string.split("\n");
    strings = strings.filter(item => item.trim() !== "");
    let method = strings[0].split(' ')[0];
    let uri = strings[0].split(' ')[1];
    let headers = strings.slice(1,strings.length-2);
    let body = strings[strings.length-1];
  return { 
    method, 
    uri, 
    headers, 
    body, 
  }; 
}
   
   http = parseTcpStringAsHttpRequest(contents);
   processHttpRequest(http.method, http.uri, http.headers, http.body);
   