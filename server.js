const express = require('express');
const app = express();
const port = 8080;
const db = require("./db.json");

app.listen(port, function(){

    console.log("inicia servidor en el puerto "+ port);
    console.log("http://localhost:"+port);

});

app.use(express.json());

//Manejar las peticiones

//app.use(respuesta);
//app.get('/',getUserInfo); // obtener algo
/*app.put(); // Editar algo
app.put(); //enviar algo
app.delete(); // borrar algo
*/
/*
function respuesta(request, response, next){
    response.send('Respuesta del servidor');

    next();
}

function getUserInfo (request,response){
const userList = ['Luis', 'Andrea', 'Nayely'];
response.send(userList[2]);
}
*/
app.get('/',getUserInfo); // obtener algo

app.put("/",editUserInfo);

function getUserInfo(request, response){
    response.send(db);
}

function editUserInfo(request, response){

const newName = request.body.name;

db.name = newName;

response.send(db);

}