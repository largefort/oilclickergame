document.addEventListener('DOMContentLoaded', function() {
    let oil = 0;
    let money = 0;
    let miners = 0;
    let oilPerClick = 1;
    let oilPerSecond = 1;
    let moneyPerOil = 1;
    let minerCost = 10;
    let upgradeClickCost = 50;
    let upgradeMinerCost = 100;
    let increaseMoneyPerOilCost = 100;

    function calculateNewCost(currentCost) {
        return Math.floor(currentCost * 1.15);
    }

    function updateUI() {
        document.getElementById('oilCounter').innerText = 'Oil: ' + oil;
        document.getElementById('moneyCounter').innerText = 'Money: $' + money;
        updateUpgradeButtons();
    }

    function updateUpgradeButtons() {
        document.getElementById('buyMiner').innerText = `Buy Miner (Cost: ${minerCost} Oil)`;
        document.getElementById('upgradeClick').innerText = `Upgrade Click (Cost: ${upgradeClickCost} Oil)`;
        document.getElementById('upgradeMiner').innerText = `Upgrade Miner Efficiency (Cost: ${upgradeMinerCost} Oil)`;
        document.getElementById('increaseMoneyPerOil').innerText = `Increase Money per Oil (Cost: ${increaseMoneyPerOilCost} Money)`;
    }

    document.getElementById('mineOil').addEventListener('click', function() {
        oil += oilPerClick;
        updateChartData();
        updateUI();
    });

    document.getElementById('sellOil').addEventListener('click', function() {
        if (oil > 0) {
            money += oil * moneyPerOil;
            oil = 0;
            updateChartData();
            updateUI();
        }
    });

    document.getElementById('buyMiner').addEventListener('click', function() {
        if (oil >= minerCost) {
            miners++;
            oil -= minerCost;
            minerCost = calculateNewCost(minerCost);
            updateUI();
        }
    });

    document.getElementById('upgradeClick').addEventListener('click', function() {
        if (oil >= upgradeClickCost) {
            oilPerClick++;
            oil -= upgradeClickCost;
            upgradeClickCost = calculateNewCost(upgradeClickCost);
            updateUI();
        }
    });

    document.getElementById('upgradeMiner').addEventListener('click', function() {
        if (oil >= upgradeMinerCost) {
            oilPerSecond++;
            oil -= upgradeMinerCost;
            upgradeMinerCost = calculateNewCost(upgradeMinerCost);
            updateUI();
        }
    });

    document.getElementById('increaseMoneyPerOil').addEventListener('click', function() {
        if (money >= increaseMoneyPerOilCost) {
            moneyPerOil++;
            money -= increaseMoneyPerOilCost;
            increaseMoneyPerOilCost = calculateNewCost(increaseMoneyPerOilCost);
            updateUI();
        }
    });

    setInterval(function() {
        if (miners > 0) {
            oil += miners * oilPerSecond;
            updateChartData();
            updateUI();
        }
    }, 1000);

    // Chart.js initialization
    let oilDataPoints = [];
    const ctx = document.getElementById('oilProductionChart').getContext('2d');
    const oilProductionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: oilDataPoints.map(dp => ''), // Map each data point to an empty string for the label
            datasets: [{
                label: 'Oil Production',
                data: oilDataPoints,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateChartData() {
        oilDataPoints.push(oil);
        if (oilDataPoints.length > 20) { // Keeps the chart from getting too crowded
            oilDataPoints.shift();
        }
        oilProductionChart.data.labels = oilDataPoints.map(dp => '');
        oilProductionChart.data.datasets.forEach((dataset) => {
            dataset.data = oilDataPoints;
        });
        oilProductionChart.update();
    }
});
