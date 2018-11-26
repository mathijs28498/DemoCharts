
var chartCount;
var ticketCount = [];
var rootCause = [];
var defaultBackgroundColors = ["#003f5c",
                               "#444e86",
                               "#955196",
                               "#dd5182",
                               "#ff6e54",
                               "#ffa600"];
var color1 = [0,0,255];
var color2 = [0,255,255];
var backgroundColors = [];
var rootCauseChartData;

function main() {
    getFromJSON();
}

function getFromJSON() {
    $.getJSON( "/database", function( data ) {
        chartCount = data.ROWCOUNT;
        ticketCount = data.DATA.TICKETCOUNT;
        rootCause = data.DATA.PROBLEMRESOLVEROOTCAUSE;
        makeColorGradient();
    });
}

function makeColorGradient() {
    // Calculating the color difference per 
    var redDiff = (color2[0] - color1[0]) / (chartCount - 1);
    var greenDiff = (color2[1] - color1[1]) / (chartCount - 1);
    var blueDiff = (color2[2] - color1[2]) / (chartCount - 1);

    for (var i = 0; i < chartCount; i++) {

        // Calculating the color per pie piece and converting to hexadecimal;
        var redVal = (Math.round(redDiff * i + color1[0])).toString(16);
        var greenVal = (Math.round(greenDiff * i + color1[1])).toString(16);
        var blueVal = (Math.round(blueDiff * i + color1[2])).toString(16);

        var colorValues = [redVal, greenVal, blueVal];
        addZero(colorValues);

        backgroundColors.push("#" + colorValues[0] + colorValues[1] + colorValues[2]);
    }

    makeChartObject();
    makePieChart();
}

function addZero(values) {
    for (var i = 0; i < values.length; i++) {
        if (values[i].length == 1) {
            values[i] = "0" + values[i];
        }
    }
}

function makeChartObject() {
    rootCauseChartData = {
        labels : rootCause,
        datasets : [{
            label : "pie-chart",
            data : ticketCount,
            backgroundColor : backgroundColors
        }]
    }
}

function makePieChart() {
    var pieChartCanvas = $(".fa-chart-bar");
    var pieChartObject = new Chart( pieChartCanvas, {
        type : "pie",
        data : rootCauseChartData,
        options : {
            title : {
                display: true,
                text: "top " + chartCount + " root causes in the last 30 days"
            },
        }
    });
}=

$(document).ready(main);