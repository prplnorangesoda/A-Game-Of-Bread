document.addEventListener("DOMContentLoaded", loadContent, false);
var UpgradeList = []
class Upgrade {
    /**
     * @param  {string} name Long Name of upgrade.
     * @param  {number|Decimal} cost Cost of upgrade.
     * @param  {boolean} [purchased] Is purchased or not.
     * @param  {string} shortid Short ID of the object. PLEASE USE VARIABLE NAME!!!!
     * @param  {boolean} [displayed] If the object is instantly displayed in CSS.
     * 
     * @return {Upgrade}
     */
    constructor(name,cost,purchased = false,shortid,displayed = false) {
        this.name = name
        if(typeof cost === "number") {
            this.cost = new Decimal(cost)
        }
        else if(typeof cost != "Decimal") {
            throw new Error("Cost not valid type! Types accepted: number, Decimal")
        }
        this.cost = cost
        this.shortid = shortid
        this.displayed = displayed
        this.purchased = purchased
        this.arrayIndex = UpgradeList.length
        UpgradeList.push(shortid)
    }

    purchase(){
        if(numToAddTo.gte(this.cost)) {
            this.purchased = true
            numToAddTo = numToAddTo.minus(this.cost)
        }
    }

}
var debugMode = false
var dmconfirmed = false
var addAmount = new Decimal(1)
var numToAddTo = new Decimal(1)
var Cost = new Decimal(10)
var BreadGenerators = new Decimal(0)
var GenCost = new Decimal(100)
var genUp1 = new Upgrade("Faster Generators",200,false,shortid = "genUp1",false)
var displayinggenUp1 = false
var breadAdderAmount = new Decimal(1)
var breadGenPerSecAmount = new Decimal(1)

function loadContent() {
    document.getElementById("bodytypebeat").innerHTML = '<button id="addNumber" onclick="addNum()">loading...</button> <button id="buy" onclick="moreBread()">test</button> <button id="genBuy" onclick="breadGenerator()">100</button><p id="test">0</p><br><div id=upgrades></div>'
    document.getElementById("test").innerText = numToAddTo
    document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
    document.getElementById("buy").innerText = `Add +${breadAdderAmount} to bread adder. Cost: ${Cost}`
    document.getElementById("genBuy").innerText = `Generate +${breadGenPerSecAmount} bread per second. Cost: ${GenCost}`
}
function UpgradeFunction(index = Number) {
    if(numToAddTo.gte(200)) {
        numToAddTo = numToAddTo.minus(200)
        document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
        genUp1 = true
        breadGenPerSecAmount = breadGenPerSecAmount.plus(1)
        document.getElementById("genUp1Button").style = "display:none;"
    }
}    
var Interval = window.setInterval(Update, 20);
function Update(){
    var BreadPerTick = getBreadPerTick()
    numToAddTo = numToAddTo.plus(BreadPerTick)
    document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
    if(BreadGenerators.gte(2) && genUp1 != true && displayinggenUp1 != true) {
        document.getElementById("upgrades").innerHTML = document.getElementById("upgrades").innerHTML + '<button onclick="UpgradeFunction()" id="genUp1Button">Add +1 bread generated per each generator. Cost: 200</button>'
        displayinggenUp1 = true
    }
    if(debugMode) {
        let debugPrompt = prompt("Are you sure you want to continue to Debug Mode? (y/n)")
        if (debugPrompt === "y") {
            numToAddTo = numToAddTo.minus(numToAddTo)
            dmconfirmed = true
            debugMode = false
        }
        else if (debugPrompt === "n") {
            alert("Alright, not enabled")
            debugMode = false
        }
        else {
            alert("Could not parse user input!")
            debugMode = false
        }
    }
    if(dmconfirmed) {
        numToAddTo = numToAddTo.plus("1e7")
    }
}
function addNum() {
    numToAddTo = numToAddTo.plus(addAmount)
    document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
}
function getBreadPerTick() {
    var ReturnVar = new Decimal(0) // the variable we will return
    ReturnVar = ReturnVar.plus(BreadGenerators*0.02)
    if(genUp1) {ReturnVar = ReturnVar.times(2)}
    return ReturnVar
}
function moreBread() {
    if(numToAddTo.gte(Cost)) {
        numToAddTo = numToAddTo.minus(Cost)
        Cost = Cost * 1.3
        Cost = Decimal.round(Cost)
        addAmount = addAmount.plus(1)
        document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
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
        document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
        document.getElementById("genBuy").innerText = `Generate +${breadGenPerSecAmount} bread per second. Cost: ${GenCost}`
        document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
    }
    else {
        return null
    }
}
