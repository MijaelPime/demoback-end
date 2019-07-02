const cardsList = document.querySelector(".card-List");

//fetch () metodo asincrono.
//fetch ().then ()se ejeuctara algo despues
const port = 8080;
const url = "http://localhost:"+port;
const config = {
    method: 'get'
}
fetch(url, config)
    .then(function (response){
        console.log(response);
        return response.json();
    })
    .then(function (responseJson){
        console.log(responseJson);
        console.log(responseJson.userList[0]);
        for(let user of responseJson.userList){
            cardsList.innerHTML +=`
            <div class="card">
                <h2>${user.name}</h2>
                <p>${user.ocupation}</p>
            </div>`; //backtips
        }
    });