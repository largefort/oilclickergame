let oil = 0;
let money = 0;
let miners = 0;
let oilPerClick = 1;
let oilPerSecond = 1;
let moneyPerOil = 1;

function updateUI() {
    document.getElementById('oilCounter').innerText = 'Oil: ' + oil;
    document.getElementById('moneyCounter').innerText = 'Money: $' + money;
    document.getElementById('sellOil').innerText = 'Sell Oil for Money ($' + moneyPerOil + ' per Oil)';
}

document.getElementById('mineOil').addEventListener('click', function() {
    oil += oilPerClick;
    updateUI();
});

document.getElementById('sellOil').addEventListener('click', function() {
    money += oil * moneyPerOil;
    oil = 0;
    updateUI();
});

document.getElementById('buyMiner').addEventListener('click', function() {
    let minerCost = 10 + miners * 10;
    if (oil >= minerCost) {
        miners++;
        oil -= minerCost;
        updateUI();
    }
});

document.getElementById('upgradeClick').addEventListener('click', function() {
    let upgradeCost = 50;
    if (oil >= upgradeCost) {
        oilPerClick++;
        oil -= upgradeCost;
        updateUI();
    }
});

document.getElementById('upgradeMiner').addEventListener('click', function() {
    let upgradeCost = 100;
    if (oil >= upgradeCost) {
        oilPerSecond++;
        oil -= upgradeCost;
        updateUI();
    }
});

document.getElementById('increaseMoneyPerOil').addEventListener('click', function() {
    let upgradeCost = 100;
    if (money >= upgradeCost) {
        moneyPerOil++;
        money -= upgradeCost;
        updateUI();
    }
});

document.getElementById('prestige').addEventListener('click', function() {
    if (confirm("Are you sure you want to prestige? This will reset your progress but increase your production rates permanently.")) {
        oil = 0;
        money = 0;
        miners = 0;
        oilPerClick *= 2;
        oilPerSecond *= 2;
        moneyPerOil = 1;
        updateUI();
    }
});

setInterval(function() {
    oil += miners * oilPerSecond;
    updateUI();
}, 1000);

// Initialize UI
updateUI();
