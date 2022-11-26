
let genderContainer = document.querySelector(".gender");
let ageContainer = document.querySelector(".age");
let countryContainer = document.querySelector(".country");
let guessButton = document.querySelector('button');
loadName();


guessButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearContent();

    let name = document.querySelector("#name").value;
    
    async function getGender() {
        if (name.includes(" ")){
            alert("You can't input spaces!!")}
            else{
        let url = 'https://api.genderize.io/?name=';
        let response = await fetch(url + name);
        let gettenGender = await response.json();
        genderContainer.append(gettenGender.gender);
        saveName(name);
        loadName();
    }}
    //getGender();


    async function getAge() {
        if (name.includes(" ")){
            return;}
            else{
        let url = 'https://api.agify.io?name=';
        let response = await fetch(url + name);
        let gettenage = await response.json();
        ageContainer.append(gettenage.age);
    }}
    //getAge();

    async function getcountry() {
        if (name.includes(" ")){
           return;}
            else{
        let url = 'https://api.nationalize.io/?name=';
        let response = await fetch(url + name);
        let gettenCountry = await response.json();
       
         let myArray = gettenCountry.country;
         var ul = document.createElement("ul");
        document.body.appendChild(ul);
        for (let i = 0; i < myArray.length; i++){
            var li = document.createElement("li");  
            li.className = "countryANDflag";

            var a = document.createElement("a");
             a.innerHTML = gettenCountry.country[i].country_id;
            console.log(country[i])
            li.appendChild(a);
            ul.appendChild(li);
           // document.querySelector(".countryANDflag").append(gettenCountry.country[i].country_id);
        }

        console.log(myArray)
        await getFlag(gettenCountry)
  
    }}
    //getcountry();


    async function getFlag() {
        if (name.includes(" ")){
           return;}
            else{
        let url = 'https://restcountries.com/v3.1/alpha?codes=';
            
        let response = await fetch(url);
        let gettenFlag = await response.json();
        document.getElementsByClassName("flag").append(gettenFlag.flags[0]);
    }}
    //getFlag();


    let allPromisses =  Promise.all([getAge(),getGender(),getcountry()])
    allPromisses.then(()=>
    getFlag(),
    //console.log("finally")
    )
});


function saveName(value) {
    localStorage.setItem('name', value);
}

function loadName() {
    let name = localStorage.getItem('name');
     if (name != null) {

        let li = document.createElement('li');
        li.innerText = name.toUpperCase();
        let ul = document.getElementsByClassName('previous')[0];
        ul.appendChild(li);
    }
}



function clearContent() {
    genderContainer.innerHTML = " ";
    ageContainer.innerHTML = " ";
//    countryContainer.innerHTML = " ";
}

