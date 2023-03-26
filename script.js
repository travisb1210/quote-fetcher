const max = 100
const interval = 10000
const url = "https://type.fit/api/quotes"

var handle = null
var id = null
var dataCache = null

function getQuote(){
    if(dataCache === null) {
        console.log("Initializing dataCache")
        fetch(url)
        .then((response) => {
            id = getRandomNumber(1, 400)
            return response.json();
        })
        .then((data) => {
            document.getElementById("start").disabled = true
            document.getElementById("stop").disabled = false
            displayQuote(data, id)
        })
        .catch(() => {
            console.log("NO INTERNET CONNECTION ERROR")
            document.getElementById("author").innerHTML = "ERROR"
            document.getElementById("text").innerHTML = "ERROR"
        })
    }else{
        console.log("dataCache is not null")
        displayQuote(dataCache, id)
    }
}

function displayQuote(data, id) {
    dataCache = data
    if(document.getElementById("stop").disabled) {
        document.getElementById("stop").disabled = false
        document.getElementById("start").disabled = true
    }
    console.log(data[getRandomNumber(id)]);
    if(data[id].author !== null ) {
        document.getElementById("author").innerHTML = data[id].author 
    }else {
        document.getElementById("author").innerHTML = "Unknown" 
    }
    document.getElementById("text").innerHTML = data[id].text;
    pictureDisplayer(data[id].author)
    document.getElementById("quote").hidden = false
    handle = setInterval(() => {
        id = getRandomNumber(1, 400)
        if(data[id].author !== null ) {
            document.getElementById("author").innerHTML = data[id].author 
        }else {
            document.getElementById("author").innerHTML = "Unknown" 
        }
        document.getElementById("text").innerHTML = data[id].text;
        pictureDisplayer(data[id].author)
        console.log("Displaying new quote")
    }, interval);
}

function stop() {
    document.getElementById("start").disabled = false
    document.getElementById("stop").disabled = true
    document.getElementById("quote").hidden = true
    document.getElementById("author").innerHTML = ""
    document.getElementById("text").innerHTML = ""
    clearInterval(handle)
    console.log("Interval cleared")
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function pictureDisplayer(authorName) {
    switch(authorName) {
        case "William Shakespeare":
            document.getElementById("quote").src = "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRvujPfubLF7zWdhhUGofGtp7WD1OjSJ3IIZ6FugaohBnUNzzi2Cd4g5eQWBDwdrS_F6YM6c0JNX9Ejm6o"
            break
        case "Buddha":
            document.getElementById("quote").src = "https://www.lionsroar.com/wp-content/uploads/2017/02/5-DP297456r4_61A-1.jpg"
            break
        case "Albert Einstein":
            document.getElementById("quote").src = "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg"
            break
        case "Voltaire":
            document.getElementById("quote").src = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Atelier_de_Nicolas_de_Largilli%C3%A8re%2C_portrait_de_Voltaire%2C_d%C3%A9tail_%28mus%C3%A9e_Carnavalet%29_-002.jpg"
            break  
        case "Marcus Aurelius":    
            document.getElementById("quote").src = "https://upload.wikimedia.org/wikipedia/commons/e/ec/MSR-ra-61-b-1-DM.jpg"  
            break
        //The idea is to continue finding public images of the quotes generated
        //by the URL and add them as cases to this switch block. There is probably 
        //a more efficient way of doing that though
        default:
            console.log("No picture found for given")
            document.getElementById("quote").src = ""            
    }
}
