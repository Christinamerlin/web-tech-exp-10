var http=require('http');
var fs=require('fs');

const server=http.createServer(function (req,res){
    if(req.url==='/'){
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.createReadStream('form.html').pipe(res);
    }
    else if(req.url==='/register' && req.method==='POST'){
        var recData='';
        req.on('data',function(data){
               recData+= data;
        })
        req.on('end',function(){
            var inputdata=new URLSearchParams(recData);
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write("<h1 style='color:blue'>"+"USER SUBMITTED DETAILS"+"</h1>")
            res.write("<table style='font-color:blue, margin-left:auto, margin-right:auto' border=1 cellspacing=0><tr><td>NAME</td><td>"+inputdata.get('username')+"</td></tr>")
            res.write("<tr><td>Password</td><td>"+inputdata.get('password')+"</td></tr>")
            res.write("<tr><td>Age</td><td>"+inputdata.get('age')+"</td></tr>")
            res.write("<tr><td>Mobile number</td><td>"+inputdata.get('mobileno')+"</td></tr>")
            res.write("<tr><td>Email</td><td>"+inputdata.get('email')+"</td></tr>")
            res.write("<tr><td>Gender</td><td>"+inputdata.get('gender')+"</td></tr>")
            res.write("<tr><td>State</td><td>"+inputdata.get('state')+"</td></tr>")
            res.write("<tr><td>Skills</td><td>"+inputdata.get('skill[]')+"</td></tr>")
            res.write("</table>")     
            res.end();

        })
    }
})
server.listen(8000,function(){
    console.log('server started at 8000');
})