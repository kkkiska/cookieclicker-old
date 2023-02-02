const moneyItem = document.querySelector ("#moneyItem")
const moneySecItem = document.querySelector ("#moneySecItem")
const cookie = document.querySelector (".cookie")
const clickerQuantityItem = document.querySelector ("#clicker-num")
const grannyQuantityItem = document.querySelector ("#granny-num")
const factoryQuantityItem = document.querySelector ("#factory-num")

const itemClicker = document.querySelector ("#item-clicker")
const itemGranny = document.querySelector ("#item-granny")
const itemFactory = document.querySelector ("#item-factory")
const animco = document.querySelector (".animco")

const clickerPriceItem = document.querySelector ("#clicker-price")
const grannyPriceItem = document.querySelector ("#granny-price")
const factoryPriceItem = document.querySelector ("#factory-price")

const gameButtonColor = document.querySelectorAll (".game-button-price")

cookie.addEventListener ("click", () => {
  userObj.moneyValue = userObj.moneyValue + 1;
  moneyItem.textContent = userObj.moneyValue;
});

var userObj = {
  moneyValue: 0,
  moneySecValue: 0
}

var clickerObj = {
  priceValue: 10,
  quantityValue: 0,
  increaseSec: 1,
}

var grannyObj = {
  priceValue: 100,
  quantityValue: 0,
  increaseSec: 10,
};

var factoryObj = {
  priceValue: 1000,
  quantityValue: 0,
  increaseSec: 100
};

function SaveData() {
  localStorage.setItem ("userObj", JSON.stringify(userObj));
  localStorage.setItem ("clickerObj", JSON.stringify(clickerObj));
  localStorage.setItem ("grannyObj", JSON.stringify(grannyObj));
  localStorage.setItem ("factoryObj", JSON.stringify(factoryObj));

}

window.onload = function LoadData() {
    if (localStorage.getItem('userObj') != null) {
      userObj = JSON.parse(localStorage.getItem('userObj'));
    }
    if (localStorage.getItem('clickerObj') != null) {  
      clickerObj = JSON.parse(localStorage.getItem('clickerObj'));
    }
    if (localStorage.getItem('grannyObj') != null) {
      grannyObj = JSON.parse(localStorage.getItem('grannyObj'));
    }
    if (localStorage.getItem('factoryObj') != null) {
      factoryObj = JSON.parse(localStorage.getItem('factoryObj'));
    }
      moneyItem.textContent = userObj.moneyValue;
    moneySecItem.textContent = userObj.moneySecValue;
    clickerQuantityItem.textContent = clickerObj.quantityValue;
    grannyQuantityItem.textContent = grannyObj.quantityValue;
    factoryQuantityItem.textContent = factoryObj.quantityValue;
    if (clickerObj.priceValue >= 1000000) {
      clickerPriceItem.textContent = (clickerObj.priceValue / 1000000).toFixed(2) + "млн $";
    } else {
      clickerPriceItem.textContent = clickerObj.priceValue + "$";
    }
    if (grannyObj.priceValue >= 1000000) {
      grannyPriceItem.textContent = (grannyObj.priceValue / 1000000).toFixed(2) + "млн $";
    } else {
      grannyPriceItem.textContent = grannyObj.priceValue + "$";
    }
    if (factoryObj.priceValue >= 1000000) {
      factoryPriceItem.textContent = (factoryObj.priceValue / 1000000).toFixed(2) + "млн $";
    } else {
      factoryPriceItem.textContent = factoryObj.priceValue + "$";
    }
}

setInterval(() => {
  SaveData();
  Frame();
}, 1000);

function Frame() {
  userObj.moneyValue = userObj.moneyValue + userObj.moneySecValue;
  moneyItem.textContent = userObj.moneyValue;
  ColorIsAvailable(clickerObj.priceValue, 0);
  ColorIsAvailable(grannyObj.priceValue, 1);
  ColorIsAvailable(factoryObj.priceValue, 2);
}

function ColorIsAvailable(priceValue, i) {
  if (userObj.moneyValue >= priceValue) {
    gameButtonColor[i].style.color = "green"
  } else {
    gameButtonColor[i].style.color = "red"
  }
}

itemClicker.addEventListener ("click", () => {
  clickerObj = Interaction (clickerObj.priceValue, clickerPriceItem, clickerObj.quantityValue, clickerQuantityItem, clickerObj.increaseSec)
})

itemGranny.addEventListener ("click", () => {
  grannyObj = Interaction (grannyObj.priceValue, grannyPriceItem, grannyObj.quantityValue, grannyQuantityItem, grannyObj.increaseSec)
})

itemFactory.addEventListener ("click", () => {
  factoryObj = Interaction (factoryObj.priceValue, factoryPriceItem, factoryObj.quantityValue, factoryQuantityItem, factoryObj.increaseSec);
})

function Interaction (priceValue, priceItem, quantityValue, quantityItem, increaseSec) {
  if (userObj.moneyValue >= priceValue) {
    userObj.moneyValue = userObj.moneyValue - priceValue;
    priceValue = Math.round(priceValue * 1.15);
    if (priceValue >= 1000000) {
      priceItem.textContent = (priceValue / 1000000).toFixed(2) + "млн $";
    } else {
      priceItem.textContent = priceValue + "$";
    }
    quantityValue = quantityValue + 1;
    quantityItem.textContent = quantityValue;
    userObj.moneySecValue = userObj.moneySecValue + increaseSec;
    moneySecItem.textContent = userObj.moneySecValue;
  } else {
    alert ("У вас недостаточно денег!")
  }
  return { 
    priceValue: priceValue,
    quantityValue: quantityValue,
    increaseSec: increaseSec
  };
}