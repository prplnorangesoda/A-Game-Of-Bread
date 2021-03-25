var addAmount = new Decimal(1)
var numToAddTo = new Decimal(1)
var Fuck = new Decimal("1e16")
var Cost = new Decimal(10)
console.log(Fuck)
document.getElementById("test").innerText = numToAddTo
document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
document.getElementById("buy").innerText = `Add +1 to bread adder. Cost: ${Cost}`
function addNum() {
    numToAddTo = numToAddTo.plus(addAmount)
    document.getElementById("test").innerText = numToAddTo
}
function getBreadPerSecond() {
    return addAmount.times(5) // with 5 cps
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