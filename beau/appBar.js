// reference the mychart id in the HTML
var myChart = document.getElementById("myChart").getContext("2d");

//global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "black";
Chart.defaults.scale.ticks.beginAtZero = true;

// set up empty lists to append to
const city = {
    district: [],
    deltaDate: [],
};

// use d3 to import the csv from the data file
d3.csv("./SDGraffiti3.csv")
.then((data) => { // promise note to load this info before the chart
    const buffer = {};
    const chartData = [];
    data.forEach(({district, deltaDate}) => {
        if(buffer[district]) {
            buffer[district].push(+deltaDate) 
        } else {
            buffer[district] = [+deltaDate]
        }
    })

    for (let district in buffer) {
        chartData.push({
            district,
            deltaDateAvg: Math.round(buffer[district].reduce((acc, cur) => acc + cur, 0) / buffer[district].length),
        })
    }
    drawChart(chartData);
});

function drawChart(data) { //define function that creates the charts
    const { district, deltaDate} = city;
    const districts = data.map(({ district }) => district);
    const deltaDateAvgs = data.map(({ deltaDateAvg }) => deltaDateAvg);
    console.log(districts, 'districts');
    console.log(deltaDateAvgs, 'deltaDateAvgs')

    var graffitiChart = new Chart(myChart, {
        type: "bar", 
        data: {
            labels: districts,
            datasets: [{
                label: 'Avg Days' ,
                data: deltaDateAvgs,
                backgroundColor: "dodgerblue",
                borderWidth: 3,
                borderColor: "nayvblue",
                hoverBorderWidth: 5,
                hoverbackgroundColor: "red",
                hoverBorderColor: "crimson",
            }],
        }, 

        options: {
            title: {
                display: true,
                text: "What is going on?"
            },
            },

            legend: {
                position: "right",
                labels: {
                    fontColor: "black"
                }
            }
            })
        }
    ;




