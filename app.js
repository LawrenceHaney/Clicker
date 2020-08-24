//Data

//TODO player objects
let player= {
  currancy: 0,
  allclicks: 0,
  invantory:[]
}
let clickmod = 1
let incrimenter = 0

//TODO shop objects
let shop= [
  {
    name: "Wooden Crank",
    cost: 10,
    inflate: 2,
    target: "clickmod",
    power: 1,
    id: IDgen(),
    icon:"fas fa-ruler",
    notes: "A bit more then some twigs lashed together, but it should make cranking a bit less work",
  },
  {
    name: "Metal Crank",
    cost: 1000,
    inflate: 2,
    target: "clickmod",
    power: 10,
    id: IDgen(),
    icon:"fas fa-wrench",
    notes: "A study metal crank with a easy to grip handle. This should make cranking much easier",
  },
  {
    name: "Wooden Gear",
    cost: 100,
    inflate: 2,
    target: "incrimenter",
    power: 10,
    id: IDgen(),
    icon: "fas fa-cogs",
    notes: "Cobbled together with the junk spat out by the machine, attaching it near your crank might speed things up",
  },
  {
    name: "Rusty Gear",
    cost: 10000,
    inflate: 2,
    target: "incrimenter",
    power: 100,
    id: IDgen(),
    icon: "fas fa-cogs",
    notes: "A hulking rusted gear with sevral of its teeth missing, its large size makes it unwheildy but it spins without rest",
  }
]

//Logic

//TODO on click action
function mine(){
  player.currancy += clickmod
  player.allclicks ++
  drawshop()
}

//TODO on buy option
function verifypurchase(id){
  let elm = findbyID(id)
  if (player.currancy >= elm.cost && elm.target == "clickmod"){
    player.currancy = player.currancy - elm.cost
    elm.cost = Math.floor(elm.cost * elm.inflate)
    let mod = elm.power
    buyclicks(mod)
  }
  if (player.currancy >= elm.cost && elm.target == "incrimenter"){
    player.currancy = player.currancy - elm.cost
    elm.cost = Math.floor(elm.cost * elm.inflate)
    let mod = elm.power
    buyinctimenter(mod)
  }


}

function buyclicks(mod){
  clickmod += mod
  drawshop()
  drawmarket()
}

function buyinctimenter(mod){
  incrimenter += mod
  drawshop()
  drawmarket()
}

//TODO incrimenter
function update(){
  player.currancy += incrimenter
}

//Draw

//TODO dynamicly draw curency
function drawmoney(){
  document.getElementById("money").innerText = JSON.stringify(player.currancy)
  document.getElementById("title-bar").innerText = "You've cranked: " + JSON.stringify(player.allclicks) + " times"
}

//TODO dynamicly draw incrimenter

//TODO draw shop
function drawmarket(){

  let template = ``
  shop.forEach(powerup => 
    template += `
    <div class="card col-12 col-lg-3 bg-success text-primary text-shadow-seconday">
    <div class="card-body d-flex flex-column justify-content-around">
    <h4 class="card-title">${powerup.name}</h6>
    <h6>cost: ${powerup.cost}</h6>
    <p>${powerup.notes}</p>
    <button id="${powerup.id}" type="button" class="btn btn-warning" onclick="verifypurchase('${powerup.id}')"><i class="${powerup.icon}"></i></button>
    </div>
    </div>
    `
    );
    document.getElementById("market").innerHTML= template
  }


//TODO dynamicly represent purchase
function drawshop(){
  document.getElementById("clickpower").innerText = JSON.stringify(clickmod)
  document.getElementById("cycle").innerText = JSON.stringify(incrimenter)
}

//admin

function IDgen(){
  return Math.random().toString(36).replace(/[^a-z]+/g,'').substr(0,5);
}
function findbyID(id){
  return shop.find(i => i.id == id)
}

setInterval(drawmoney, 1)
setInterval(update, 1000)
drawmarket()
drawshop()