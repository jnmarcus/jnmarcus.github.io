var htmlDoughnut = document.getElementById("html").getContext("2d");
var cssDoughnut = document.getElementById("css").getContext("2d");
var jsDoughnut = document.getElementById("js").getContext("2d");
var gitDoughnut = document.getElementById("git").getContext("2d");
var devOpsDoughnut = document.getElementById("devOps").getContext("2d");

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

var gitData = [
  {
    value: 85,
    color:"#FF0054"
  },
  {
    value : 15,
    color : "#f2f2f2"
  }
];

var devOpsData = [
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

var myGitdoughnut = new Chart(gitDoughnut).Doughnut(gitData, {
  percentageInnerCutout : 80
});

var myDevOpsDoughnut = new Chart(devOpsDoughnut).Doughnut(devOpsData, {
  percentageInnerCutout : 80
});



