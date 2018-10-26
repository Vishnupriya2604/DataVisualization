google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawBubbleChart);

function drawBubbleChart() {
    sheet_expenditures = 'https://docs.google.com/spreadsheets/d/1G9uKCMf8F7sggP7YC8EopBpu1wVbUEas420NK6cSm-U/gviz/tq?sheet='
    sheet_healthcare = 'https://docs.google.com/spreadsheets/d/1Fa-7KU9QY_Kpp5C2BjsDgxIVISDEse6zKiv-VwWq3ow/gviz/tq?sheet='
    sheet_military = 'https://docs.google.com/spreadsheets/d/1X0X9A4rE0hk_hHCz2sw1AWJcWDgXylSBC5wEFkEwiLA/gviz/tq?sheet='
    sheet_education = 'https://docs.google.com/spreadsheets/d/1snqCSnqeS1_BnFQLWufnxd4EUkcQhsnvRuWt7rCEUEg/gviz/tq?sheet='
    drawBubble('bubble_sheet',
        'SELECT A,B,C,D',
        bubbleResponseHandler, sheet_expenditures);
    drawBubble('Correlation_healthcare',
        'SELECT A,C,B',
        correlationHealthcareResponseHandler, sheet_healthcare);
    drawBubble('Correlation_Military',
        'SELECT A,C,B ORDER BY B DESC LIMIT 9',
        correlationMilitaryResponseHandler, sheet_military);
    drawBubble('Correlation_Education',
        'SELECT A,C,B',
        correlationEducationResponseHandler, sheet_education);
}

function drawBubble(sheetName, query, responseHandler, sheet) {
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        sheet
        + sheetName + '&headers=1&tq=' + queryString);
    console.log(query)
    query.send(responseHandler);
}

function checkError(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() +
            ' ' + response.getDetailedMessage());
        return;
    }
} //checkError

function bubbleResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    var options = {
        height: 600,
        backgroundColor: { fill: 'transparent' },
        isStacked: true,
        title: 'Correlation between Healthcare,Military and Education Expenditure' +
            'of G-20 countries (2016)',

        hAxis: { title: 'Country' },
        vAxis: { title: 'Expenditure in Billions' }
    };
    //Draw Bubble Chart
    var chart = new google.visualization.BubbleChart(document.getElementById('bubble_chart_div'));
    chart.draw(data, options);
}//bubbleResponseHandler

function correlationHealthcareResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    var options = {
        height: 600,
        backgroundColor: { fill: 'transparent' },
        X: 100,

        title: 'Correlation between Healthcare Expenditure and Share of GDP' +
            ' G-20 countries (2017)',

        hAxis: { title: 'Share Of GDP in %' },
        vAxis: { title: 'Healthcare Expenditure in Billions' },
        bubble: { stroke: '#00cc00' },
    };
    //Draw Bubble Chart
    var chart = new google.visualization.BubbleChart(document.getElementById('healthcare_chart_div'));
    chart.draw(data, options);
}//correlationHealthcareResponseHandler

function correlationMilitaryResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    var options = {
        height: 600,
        backgroundColor: { fill: 'transparent' },
        //colorAxis: {colors: ['#e7711c', '#4374e0']},
        title: 'Correlation between Military Expenditure and Share of GDP' +
            ' G-20 countries (2016)',

        hAxis: { title: 'Share Of GDP in %' },
        vAxis: { title: 'Military Expenditure in Billions' },
        bubble: { stroke: '#00cc00' },
        animation: {
            startup: true,
            duration: 1000,
            easing: 'in',
        }
    };
    //Draw Bubble Chart
    var chart = new google.visualization.BubbleChart(document.getElementById('military_chart_div'));
    chart.draw(data, options);
}//correlationMilitaryResponseHandler

function correlationEducationResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    var options = {
        height: 600,
        backgroundColor: { fill: 'transparent' },
        title: 'Correlation between Education Expenditure and Share of GDP' +
            ' G-20 countries (2017)',

        hAxis: { title: 'Share Of GDP in %' },
        vAxis: { title: 'Education Expenditure in Billions' },
        bubble: { stroke: '#00cc00' },
    };
    //Draw Bubble Chart
    var chart = new google.visualization.BubbleChart(document.getElementById('education_chart_div'));
    chart.draw(data, options);
}//correlationEducationResponseHandler



