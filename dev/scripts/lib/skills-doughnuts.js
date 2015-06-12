/* Skills Doughnuts */

var htmlDoughnut = document.getElementById("html").getContext("2d");
var cssDoughnut = document.getElementById("css").getContext("2d");
var jsDoughnut = document.getElementById("js").getContext("2d");
var miscDoughnut = document.getElementById("misc").getContext("2d");

var htmlData = [
  {
    value: 90,
    color:"#FF0054"
  },
  {
    value : 10,
    color : "#f2f2f2"
  }
];

var cssData = [
  {
    value: 90,
    color:"#FF0054"
  },
  {
    value : 10,
    color : "#f2f2f2"
  }
];

var jsData = [
  {
    value: 65,
    color:"#FF0054"
  },
  {
    value : 35,
    color : "#f2f2f2"
  }
];

var miscData = [
  {
    value: 40,
    color:"#FF0054"
  },
  {
    value : 60,
    color : "#f2f2f2"
  }
];


var myHTMLdoughnut = new Chart(htmlDoughnut).Doughnut(htmlData, {
  percentageInnerCutout : 80
});

var myCSSdoughnut = new Chart(cssDoughnut).Doughnut(cssData, {
  percentageInnerCutout : 80
});

var myJSdoughnut = new Chart(jsDoughnut).Doughnut(jsData, {
  percentageInnerCutout : 80
});

var myMiscDoughnut = new Chart(miscDoughnut).Doughnut(miscData, {
  percentageInnerCutout : 80
});