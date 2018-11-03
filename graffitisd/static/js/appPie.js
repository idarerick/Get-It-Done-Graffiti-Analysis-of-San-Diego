var myChart2 = document.getElementById("myPieChart").getContext("2d");

//global options
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = "grey";

const city2 = {
district: [],
pieRange: [],
};


d3.json("/piechartdf").then(function(data) {
    console.log(data);
    for(var i in data.district){
        city2.district.push(data.district[i]);
        city2.pieRange.push(data.Count1[i]);
    }
    console.log(city2, 'all');
    drawChart()
});

function drawChart() {
    const {district, pieRange} = city2;
    var colors = ["teal", "blue", "green", "orange", "purple", "brown", "yellow", "red", "magenta"]
    
    var graphSD = new Chart(myChart2, {
        type: "doughnut",
        data: {
            labels: city2.district,
            datasets:[{
                label: "Count1",
                data: pieRange,
                backgroundColor: colors,
                borderWidth: 3,
                borderColor: "green",
                hoverBorderWidth: 5,
                hoverBorderColor: "dodgerblue",
            }]
        },
        options: {
            title: {
                display: true,
                text: "Days to complete"
            },
            legend: {
                position: "right",
                labels: {
                    fontColor: "black"
                }
            }
            }
        }
    );
}




// const distbreakdownarray = []

// d3.json("/piechartdf").then(function(data) {
//     console.log(data);
//     for (var i in data.district){
//         var dist = data.district[i];
//         var count1 = data.Count1[i];
//         var count2 = data.Count2[i];
//         var count3 = data.Count3[i];
//         if (dist) {
//             distbreakdownarray.push([dist, count1, count2, count3]);
//         }
//     }   
//     console.log(distbreakdownarray);
//     drawChart()
// });

// function distChart(district) {
//     console.log(district);
//     var districturl = "/piechart/" + 1;
//         d3.json(districturl).then(function(dataset) {
//             console.log(dataset);
//             var graphpie = new Chart(myChart2, {
//                 type: "doughnut",
//                 data: {
//                     labels: ["0 to 5 days", "6 to 18 days", "Over 18 days"],
//                     datasets: [{
//                         data: [chart_df[1], chart_df[2], chart_df[3]]
//                     }]
//                 }
//             })
//         });
// }

// var pie = []
// mynewDataSet.data.forEach(function (value, i) {
//     pie.push(new myChart)
// })


// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDistrict");

//   // Use the list of districts to populate the select options
//   d3.json("/districts").then((districtnumber) => {
//     districtnumber.forEach((district) => {
//       console.log(district);  
//       selector
//         .append("option")
//         .text(district)
//         .property("value", district);
//     });

//     // Use the first district from the list to build the initial plots
//     const firstdistrict = districtnumber[0];
//     distChart(firstdistrict);
//   });
// }

// function optionChanged(newDistrict) {
//     // Fetch new data each time a new sample is selected
//     distChart(newDistrict);
// }