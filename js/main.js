document.addEventListener("DOMContentLoaded", loadShit, false);
var addAmount = new Decimal(1)
var numToAddTo = new Decimal(1)
var Cost = new Decimal(10)
var BreadGenerators = new Decimal(1)
var GenCost = new Decimal(100)
function Update() {
}
function loadShit() { // idfk why but this shit doesn't load half the time
    console.log("shit loaded")
    document.getElementById("bodytypebeat").innerHTML = '<button id="addNumber" onclick="addNum()">loading...</button> <button id="buy" onclick="moreBread()">test</button> <button id="genBuy" onclick="breadGenerator()">100</button><p id="test">0</p>'
    document.getElementById("test").innerText = numToAddTo
    document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
    document.getElementById("buy").innerText = `Add +1 to bread adder. Cost: ${Cost}`
    document.getElementById("genBuy").innerText = `Generate +1 bread per second. Cost: ${GenCost}`
}
var Interval = window.setInterval(Update, 20);
function Update(){
    var BreadPerTick = getBreadPerTick()
    numToAddTo = numToAddTo.plus(BreadPerTick)
    document.getElementById("test").innerText = Math.round(numToAddTo * 100) / 100
}
function addNum() {
    numToAddTo = numToAddTo.plus(addAmount)
    document.getElementById("test").innerText = Math.round(numToAddTo * 100) / 100
}
function getBreadPerTick() {
    var ReturnVar = new Decimal(0) // the variable we will return
    ReturnVar = ReturnVar.plus(BreadGenerators*0.02 )
    return ReturnVar
}
function moreBread() {
    if(numToAddTo.gte(Cost)) {
        numToAddTo = numToAddTo.minus(Cost)
        Cost = Cost * 1.3
        Cost = Decimal.round(Cost)
        addAmount = addAmount.plus(1)
        document.getElementById("test").innerText = numToAddTo
        document.getElementById("buy").innerText = `Add +1 to bread adder. Cost: ${Cost}`
        document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
    }
    else {
        return null
    }
}
function breadGenerator() {
    if(numToAddTo.gte(GenCost)) {
        numToAddTo = numToAddTo.minus(GenCost)
        GenCost = GenCost * 1.3
        GenCost = Decimal.round(GenCost)
        BreadGenerators = BreadGenerators.plus(1)
        document.getElementById("test").innerText = numToAddTo
        document.getElementById("genBuy").innerText = `Generate +1 bread per second. Cost: ${GenCost}`
        document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
    }
    else {
        return null
    }
}
