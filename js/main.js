var addAmount = new Decimal(1)
var numToAddTo = new Decimal(0)
document.getElementById("test").innerText = numToAddTo
document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
function addNum() {
    let CurrentAmount = numToAddTo
    let newAmount = CurrentAmount + addAmount
    document.getElementById("test").innertext = newAmount
}