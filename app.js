let cheese = 0

let clickUpgrades = [
  {
    name: 'pickaxe',
    price: 10,
    quantity: 0,
    multiplier: 1
  },
  {
    name: 'cart',
    price: 50,
    quantity: 0,
    multiplier: 5
  }
];

let automaticUpgrades = [
  {
    name: 'rover',
    price: 100,
    quantity: 0,
    multiplier: 20
  },
  {
    name: 'miner',
    price: 200,
    quantity: 0,
    multiplier: 40
  }
];

function mine() {
  let cart = clickUpgrades.find(u => u.name == 'cart')
  let pickaxe = clickUpgrades.find(u => u.name == 'pickaxe')
  let cartCount = 1 + (cart.quantity * cart.multiplier)
  let pickaxeCount = 1 + (pickaxe.quantity * pickaxe.multiplier)

  if (cart.quantity > 0 && pickaxe.quantity > 0) {
    cheese += (cartCount + pickaxeCount)
  } else if (pickaxe.quantity > 0) {
    cheese += pickaxeCount
  } else if (cart.quantity > 0) {
    cheese += cartCount
  }
  else {
    cheese += 1
  }
  update()
}

function update() {
  let pickaxe = clickUpgrades.find(u => u.name == 'pickaxe')
  let cart = clickUpgrades.find(u => u.name == 'cart')
  let rover = automaticUpgrades.find(a => a.name == 'rover')
  let miner = automaticUpgrades.find(a => a.name == 'miner')

  let pickaxePrice = document.getElementById('pickaxePrice')
  pickaxePrice.innerText = '$' + pickaxe.price

  let cartPrice = document.getElementById('cartPrice')
  cartPrice.innerText = '$' + cart.price

  let roverPrice = document.getElementById('roverPrice')
  roverPrice.innerText = '$' + rover.price

  let minerPrice = document.getElementById('minerPrice')
  minerPrice.innerText = '$' + miner.price

  let totalCheese = document.getElementById('total-cheese')
  totalCheese.innerText = 'Cheese: ' + cheese

  let totalClicks = document.getElementById('clicks')
  let totalClickUpgrade = (1 + pickaxe.quantity * pickaxe.multiplier) + (cart.quantity * cart.multiplier)
  totalClicks.innerHTML = 'Clicks: ' + totalClickUpgrade

  let totalIdleUpgrade = (rover.quantity * rover.multiplier) + (miner.quantity * miner.multiplier)
  let idleClicks = document.getElementById('idle-clicks')
  idleClicks.innerText = 'Idle Clicks: ' + totalIdleUpgrade

  let totalPickaxes = document.getElementById('total-pickaxes')
  totalPickaxes.innerText = pickaxe.quantity

  let totalCarts = document.getElementById('total-carts')
  totalCarts.innerText = cart.quantity

  let totalRovers = document.getElementById('total-rovers')
  totalRovers.innerText = rover.quantity

  let totalMiners = document.getElementById('total-miners')
  totalMiners.innerText = miner.quantity
}

function buyPickaxe() {
  let pickaxe = clickUpgrades.find(u => u.name == 'pickaxe')
  if (cheese >= pickaxe.price) {
    cheese -= pickaxe.price
    pickaxe.quantity++
    pickaxe.price = pickaxe.price * 2
    console.log(pickaxe.price);
  }
  update()
}

function buyCart() {
  let cart = clickUpgrades.find(u => u.name == 'cart')
  if (cheese >= cart.price) {
    cheese -= cart.price
    cart.quantity++
    cart.price = cart.price * 2
  }
  update()
}

function collectAutoUpgrades() {
  automaticUpgrades.forEach(a => {
    if (a.quantity >= 0) {
      let total = (a.quantity * a.multiplier)
      cheese += total
    }
    update()
  })
}

function buyRover() {
  let rover = automaticUpgrades.find(a => a.name == 'rover')
  if (cheese >= rover.price) {
    cheese -= rover.price
    rover.quantity++
    rover.price = rover.price * 2
    console.log(rover.quantity);
  }
  update()
}

function buyMiner() {
  let miner = automaticUpgrades.find(a => a.name == 'miner')
  if (cheese >= miner.price) {
    cheese -= miner.price
    miner.quantity++
    miner.price = miner.price * 2
    console.log(miner.quantity);
  }
  update()
}

setInterval(collectAutoUpgrades, 3000)
update()