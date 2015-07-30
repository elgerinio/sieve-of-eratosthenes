var canvas;
var ctx;
var num;
var intervall;
var prim = new Array();
var event;
var color = new Array('#700000', 'red', '00FFFF', 'orange', '#0099FF', 'grey', 'darkgrey', '#CC0033', 'FF00FF', '6600CC');
var highNumber = 100;
var intervallLength = 1500;

$(document).ready(function() {
    event = new Event('print');
    document.addEventListener('print', printPrims);

    $('#start').click(startCalculation);
    $('#stop').click(stopCalculation);
    $('#continue').click(continueCalculation);
    $('#reset').click(reset);
});

function startCalculation() {
    reset();
    $('#start').hide();
    $('#stop').show();
    calculatePrim();
}

function stopCalculation() {
    stopInterval();
    $('#stop').hide();
    $('#continue').show();
    $('#reset').show();
}

function continueCalculation() {
    intervall = setInterval(deleteNumbers, intervallLength);
    $('#continue').hide();
    $('#reset').hide();
    $('#stop').show();
}

function calculatePrim() {
    $('#numbers').append('<span class="number cancelled">&nbsp;</span>');
    displayNumbers();
    intervall = setInterval(deleteNumbers, intervallLength);
}

function displayNumbers() {
    for (var i = 2; i <= highNumber; i++) {
        prim.push(false);
        $('#numbers').append('<span id="' + i + '" class="number">' + i + '</span>');
        if (i % 10 === 0) {
            $('#numbers').append('<br>');
        }
    }
}

function deleteNumbers() {
    deleteMultiple(num);
    num++;
    if (num > 10) {
        clearInterval(intervall);
        document.dispatchEvent(event);
    }
}

function deleteMultiple(i) {
    for (var j = i + i; j <= highNumber; j = j + i) {
        prim[j] = true;
        $('#' + j).addClass('cancelled');
        $('#' + j).css('background-color', color[num]);
    }
}

function printPrims() {
    for (var i = 2; i < highNumber; i++) {
        if (!prim[i]) {
            $('#prims').append('<span id="' + i + '" class="number dark">' + i + '</span>');
        }
    }
    $('#stop').hide();
    $('#start').html('Restart');
    $('#start').show();
}


function stopInterval() {
    clearInterval(intervall);
}

function reset() {
    $('#numbers').empty();
    $('#prims').empty();
    stopInterval();
    num = 2;
    $('#start').show();
    $('#reset').hide();
    $('#continue').hide();
}
