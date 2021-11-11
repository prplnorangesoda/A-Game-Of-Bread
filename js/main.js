var breadAdderMoreAmount = new Decimal(0)
var addAmount = new Decimal(1)
var numToAddTo = new Decimal(1)
var Cost = new Decimal(10)
var BreadGenerators = new Decimal(0)
var GenCost = new Decimal(100)
var breadAdderAmount = new Decimal(1)
var breadGenPerSecAmount = new Decimal(1)
    document.getElementById("bodytypebeat").innerHTML = '<button id="addNumber" onclick="addNum()">loading...</button> <button id="buy" onclick="moreBread()">test</button> <button id="genBuy" onclick="breadGenerator()">100</button><p id="test">0</p><br><div id="upgrades"></div>'
    document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
    document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
    document.getElementById("buy").innerText = `Add +${breadAdderAmount} to bread adder. Cost: ${Cost}`
    document.getElementById("genBuy").innerText = `Generate +${breadGenPerSecAmount} bread per second. Cost: ${GenCost}`
var UpgradeList = []
class Upgrade {
    /**
     * @param  {string} name Long Name of upgrade.
     * @param  {number|Decimal} cost Cost of upgrade.
     * @param  {string} shortid Short ID of the object. PLEASE USE VARIABLE NAME!!!!
     * @param  {string} description What will be shown on website.
     * @param  {boolean} [purchased] Is purchased or not.
     * @param  {boolean} [displayed] If the object is instantly displayed in CSS.
     * 
     * @return {Upgrade}
     */
    constructor(name,cost,shortid,description,purchased = false,displayed = false) {
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
        this.description = description
        UpgradeList.push(shortid)
        { // html block
        let upgrades = document.getElementById("upgrades")
        console.log(upgrades)
        upgrades.innerHTML = upgrades.innerHTML + `<button id="${this.shortid}" onclick="try{UpgradeFunction(${this.arrayIndex})}catch(err){console.error(err)}" style="align:center;">${this.description} Cost: ${this.cost}</button>`
        let upgradeActual = document.getElementById(this.shortid)
        if(!this.displayed) {
            upgradeActual.style = "display:none;"
        }
        }
        
    }

    purchase(){
        if(numToAddTo.gte(this.cost)) {
            this.purchased = true
            this.displayed = false
            let button = document.getElementById(this.shortid)
            button.style = 'display:none;'
            numToAddTo = numToAddTo.minus(this.cost)
            return "Purchased"
        }
        else {
            return new Error("Could not purchase!")
            // NOTE: add else case
        }
    }

}
var debugMode = false
var dmconfirmed = false
{ // Upgrade list
    var genUp1 = new Upgrade("Faster Generators",200,"genUp1","Increase bread generated from all generators by 1.",false,false)
    var breadUp1 = new Upgrade("Better Bakers",100,"breadUp1","Increase bread added from adders by 1.",false,false)
    var genUp2 = new Upgrade("Even Faster Generators",500,"genUp2","Increase bread generated from all generators by 1, again.",false,false)
}

var displayinggenUp1 = false

function UpgradeFunction(index) {
    if(typeof index != "number") {
        return new Error("Index is not a number!")
    }
    let Upg = eval("UpgradeList")
    Upg = eval(Upg[index])
    try {
        Upg.purchase()
    }
    catch(err) {
        console.error(err)
        console.warn("Cannot purchase upgrade!")
    }
}    
var Interval = window.setInterval(Update, 20);
var UpgradeCategory = document.getElementById("upgrades")
var UpgradeChildren = UpgradeCategory.children
function displayUpgrade(UpgradeName,yesno) {
    let Upgrade = UpgradeChildren.namedItem(UpgradeName)
    let uhh = eval(UpgradeName)
    if(typeof yesno == undefined) {yesno = true}
    if(yesno){
        Upgrade.style = Upgrade.style + "display:block;"
        uhh.displayed = true
    }
    else if(!yesno) {
        Upgrade.style = Upgrade.style + "display:none;"
        uhh.displayed = false
    }
    else {
        throw new Error("yesno :(")
    }
}
var thisvariableorsumn;
function Update(){
    var BreadPerTick = getBreadPerTick()
    numToAddTo = numToAddTo.plus(BreadPerTick)
    document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
    { // Upgrade conditions
        if(addAmount.gte(3) && breadUp1.purchased === false && breadUp1.displayed === false) {
            displayUpgrade("breadUp1",true)
        }
        if(BreadGenerators.gte(2) && genUp1.purchased === false && genUp1.displayed === false) {
            displayUpgrade("genUp1",true)
        }
        if(BreadGenerators.gte(4) && genUp2.purchased === false && genUp2.displayed === false) {
            displayUpgrade("genUp2",true)
        }

    }
    { // Upgrade effects
        if(breadUp1.purchased && thisvariableorsumn != true) {
            breadAdderAmount = new Decimal(2)
            document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
            thisvariableorsumn = true
            numToAddTo = numToAddTo.plus(Cost)
            breadAdderMoreAmount = breadAdderMoreAmount.minus(1)
            moreBread()
            document.getElementById("buy").innerText = `Add +${breadAdderAmount} to bread adder. Cost: ${Cost}`
        }
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
    if(genUp1.purchased) {ReturnVar = ReturnVar.times(2)}
    return ReturnVar
}
function moreBread() {
    if(numToAddTo.gte(Cost)) {
        breadAdderMoreAmount = breadAdderMoreAmount.plus(1)
        numToAddTo = numToAddTo.minus(Cost)
        Cost = Cost * 1.3
        Cost = Decimal.round(Cost)
        document.getElementById("test").innerText = numToAddTo.mag.toFixed(2)
        document.getElementById("buy").innerText = `Add +${breadAdderAmount} to bread adder. Cost: ${Cost}`
        var finalBreadAmount = new Decimal(0)
        console.log(breadUp1.purchased)
        if(breadUp1.purchased) {finalBreadAmount = breadAdderMoreAmount.times(2)}
        else {finalBreadAmount = breadAdderMoreAmount}
        finalBreadAmount++
        addAmount = finalBreadAmount
        addAmount = new Decimal(addAmount)
        document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
    }
    else {
        return null
    }
    addAmount
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