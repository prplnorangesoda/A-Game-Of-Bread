var addAmount = new Decimal(1)
var numToAddTo = new Decimal(1)
document.getElementById("test").innerText = numToAddTo
document.getElementById("addNumber").innerText = `Add ${addAmount} to the amount of bread`
function addNum() {
    numToAddTo = numToAddTo + addAmount
    console.log(numToAddTo)
}