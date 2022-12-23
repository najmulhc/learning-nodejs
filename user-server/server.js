const fs = require('fs');
const http = require('http'); 
const url = require('url')
 

const userDisplayer = (file, user ) => {
    let result = file.replace(/%USERNAME%/, user.name)  ;
    result = result.replace("%COMPANY%", user.company.name)
    result = result.replace("%WEBSITE%", user.website)
    result = result.replace("%EMAIL%", user.email)
    result = result.replace("%PHONE%", user.phone)
    return result;
}

const server = http.createServer((req, res) => {
    // finding user id from url query... 
    const user = parseInt(url.parse(req.url, true).query.user);
 
    // here I have parsed the json data we have in the json file and stored that into a variable. 
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));
 
    fs.readFile("./index.html", 'utf-8' , (err, html) => {
        if(err){
            console.error(err);
            return
        }  
        if(user < 10){
            const hostedFrom =  userDisplayer(html, users[user])
            res.end(hostedFrom);
        }
             
        return;
    })
});


server.listen(1234, () => {
    console.log("server is running in the port" +' 127.0.0.1/1234')
})