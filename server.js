const express = require('express');
const app = express();
const port = 8080;
const db = require("./db.json");
const cors = require("cors");

app.listen(port, function(){
    console.log("inicia servidor en el puerto "+ port);
    console.log("http://localhost:"+port);
});

app.use(cors());
app.use(express.json());
app.get('/',getUserGeneral); // obtener algo get en general
app.get('/:id',getUserEspecial); //obtener un id en particular
// app.put("/",editUserInfo); put general
app.put('/:id', editUserInfo); //si quiero un id en particular
app.post('/',createUser);
app.delete('/:id',deleteUser);

function getUserGeneral(request, response){
    response.send(db);
}

//TODO obtener el id en particular
//agregar propiedades
//tomar el ID no la posicìon
//id no se repita

function getUserEspecial(request, response){
    const id = request.params.id;
    const userSelect = db.userList[id];
        if(userSelect){
            response.status(200).send(userSelect);         
        }else {
            response.status(409).send({ error: 'Usuario No Encontrado' });   
        }    

        /*for(let i = 0; i< db.userList.length; i++){
            if(db.userList[i].id == id){
                response.send(userSelect);  
            }
        }*/
}

function editUserInfo(request, response){
    const id = request.params.id;
    const userToUpdate = "";

    for(let i = 0; i< db.userList.length; i++){
        if(db.userList[i].id == id){
            userToUpdate = db.userList[i];
        }
    }

    if(request.body.name){
        const newName = request.body.name;
        userToUpdate.name = newName;    
    }
    if(request.body.age){
        const newAge = request.body.age;
        userToUpdate.age = newAge;    
    }
    if(request.body.gender){
        const newDender = request.body.gender;
        userToUpdate.gender = newDender;    
    }
    if(request.body.ocupation){
        const newOcupation = request.body.ocupation;
        userToUpdate.ocupation = newOcupation;    
    }
    response.status(200).send(db);
}

function createUser(request, response){
    const newUser = request.body.user;
    newUser.id = db.userList.length;
    db.userList.push(newUser);
    response.send(db);
    //crear metodo random de id
    //ver que no se repita el id
} 

function deleteUser(request, response){
    const id = request.params.id;
    for(let i = 0; i < db.userList.length; i++ ){
        if(db.userList[i].id == id){
            db.userList.splice(i,1);
        }
    }
    response.send(db);
}

//Manejar las peticiones
/*
app.use(respuesta);
app.get('/',getUserInfo); // obtener algo
app.put(); // Editar algo
app.put(); //enviar algo
app.delete(); // borrar algo


function respuesta(request, response, next){
    response.send('Respuesta del servidor');

    next();
}

function getUserInfo (request,response){
const userList = ['Luis', 'Andrea', 'Nayely'];
response.send(userList[2]);
}
*/
