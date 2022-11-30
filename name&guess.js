
let genderContainer = document.querySelector(".gender");
let ageContainer = document.querySelector(".age");
let countryContainer = document.body.querySelector('.country_container');
let flagContainer = document.body.querySelector('.flag_container');
let guessButton = document.querySelector('button');
loadName();


guessButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearContent();

    let name = document.querySelector("#name").value;

    async function getGender() {
        if (name.includes(" ")) {
            alert("You can't input spaces!!")
        }
        else {
            let url = 'https://api.genderize.io/?name=';
            let response = await fetch(url + name);
            let gettenGender = await response.json();
            genderContainer.append(gettenGender.gender);
            saveName(name);
            loadName();
        }
    }

    async function getAge() {
        if (name.includes(" ")) {
            return;
        }
        else {
            let url = 'https://api.agify.io?name=';
            let response = await fetch(url + name);
            let gettenage = await response.json();
            ageContainer.append(gettenage.age);
        }
    }

    async function getcountry() {
        if (name.includes(" ")) {
            return;
        }
        else {
            let url = 'https://api.nationalize.io/?name=';
            let response = await fetch(url + name);
            let gettenCountry = await response.json();

            let myArray = gettenCountry.country;
            let ul = document.createElement("ul");
            document.body.querySelector('.country_container').appendChild(ul);
            for (let i = 0; i < myArray.length; i++) {
                let li = document.createElement("li");
                li.className = "countryCSS";
                li.innerHTML = gettenCountry.country[i].country_id;
                ul.appendChild(li);
                let x = li.innerHTML;
                await getFlag(x);
            }

            
        }
    }

    async function getFlag(x) {
        if (name.includes(" ")) {
            return;
        }
        else {
            let url = 'https://restcountries.com/v3.1/alpha?codes=';

            let response = await fetch(url+x);
            let gettenFlag = await response.json();
            let myArray = gettenFlag.flags;
            let ul = document.createElement("ul");
            console.log(gettenFlag)
            document.body.querySelector('.flag_container').appendChild(ul);
                let img = document.createElement('img');
                img.className = "flag_container"
                img.src = gettenFlag[0].flags.png;
                
                let li = document.createElement("li");
                li.className = "flag_container";
                li.append(img);
                ul.appendChild(li);
           
                }
    }


    let allPromisses = Promise.all([getAge(), getGender(), getcountry()])
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
    countryContainer.innerHTML = " ";
    flagContainer.innerHTML = " ";
}

