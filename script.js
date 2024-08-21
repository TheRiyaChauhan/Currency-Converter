let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;


const dropdownSelects = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdownSelects){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected= "selected";
        }
        if(select.name==="to" && currCode==="INR"){
            newOption.selected= "selected";
        }
        select.append(newOption);

    }

    select.addEventListener("change" , (e)=>{
        updateFlag(e.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click" , (e)=>{
    e.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async ()=>{
      let amt = document.querySelector(".amount input");
      let amtVal = amt.value;

      let URL1 = `${URL}/${fromCurr.value.toLowerCase()}.json`;
      let response = await fetch(URL1);
      let data = await response.json();
      let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

      let finalAmt = amtVal*rate;
      msg.innerText =`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

window.addEventListener("load", ()=>{
    updateExchangeRate();
})