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
       $body = "not found";
       $headers = "Date: "+getCurrentDateFormatted()+"\n"+
                        "Server: Apache/2.2.14 (Win32)\n"+
                        "Content-Length: " + $body.length+"\n"+
                        "Connection: Closed\n"+
                        "Content-Type: text/html; charset=utf-8\n";
       if($method!=="GET"){
            statusCode=400;
            statusMessage = "Bad Request";
       }else if(!$uri.startsWith("/sum")){
            statusCode=404;
            statusMessage = "Not Found";
       }else if(!$uri.startsWith("/sum?nums=")){
            statusCode=400;
            statusMessage = "Bad Request";
        }else{
            $uri = $uri.replace("/sum?nums=", '');
            let nums = $uri.split(",");
            $body = 0;
            for (let i = 0; i < nums.length; i++) {
                $body += parseInt(nums[i]);
            }
            $headers = "Date: "+getCurrentDateFormatted()+"\n"+
                        "Server: Apache/2.2.14 (Win32)\n"+
                        
                        "Connection: Closed\n"+
                        "Content-Type: text/html; charset=utf-8\n"+
                        "Content-Length: " + $body.toString().length+"\n";
        }
       outputHttpResponse(statusCode, statusMessage, $headers,$body);
   }
   
   function parseTcpStringAsHttpRequest(string) { 
    let strings = string.split("\n");
    let method = strings[0].split(' ')[0];
    let uri = strings[0].split(' ')[1];
    let headers = strings.slice(1,-2);
    let body = strings[strings.lenth-1];
  return { 
    method, 
    uri, 
    headers, 
    body, 
  }; 
}
   
   http = parseTcpStringAsHttpRequest(contents);
   processHttpRequest(http.method, http.uri, http.headers, http.body);
   