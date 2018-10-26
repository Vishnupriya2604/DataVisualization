//google.charts.load('current', { 'packages': ['corechart'] }); //load google charts
google.charts.setOnLoadCallback(drawAllMilitarySpending);

function drawAllMilitarySpending() {

    drawSheet('Military_Expenditure',
        'SELECT A,B,C,D,E,F,G,H',
        militaryExpenditureResponseHandler);
    drawSheet('Military_Expenditure',
        'SELECT A,I',
        topMilitarySpendingResponseHandler);
    drawSheet('Military_Expenditure',
        'SELECT A,H',
        topMilitaryExpenseResponseHandler);
    drawSheet('ShareOfGDP',
        'SELECT A,H',
        shareOfGDPResponseHandler);
} //drawAllMilitarySpending

function drawSheet(sheetName, query, responseHandler) {

    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1X0X9A4rE0hk_hHCz2sw1AWJcWDgXylSBC5wEFkEwiLA/gviz/tq?sheet='
        + sheetName + '&headers=1&tq=' + queryString);
    console.log(query)
    query.send(responseHandler);
} //drawSheet

function checkError(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() +
            ' ' + response.getDetailedMessage());
        return;
    }
} //checkError

function militaryExpenditureResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 7, desc: true });

    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Military Expenditure in Billions ($)' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('military_expenditure_div'));
    chart.draw(data, options);
} //militaryExpenditureResponseHandler

function topMilitarySpendingResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        hAxis: { title: 'Country' },
        vAxis: { title: 'Total Military Expenditure in Billions ($)' }

    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('total_spending_div'));
    chart.draw(data, options);
}//topMilitaryResponseHandler

function topMilitaryExpenseResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        colorAxis: { colors: ['#e7711c', '#4374e0'] }, //orange to blue
        title: 'Military Expenditure in 2016 US Billions ($)'
    };
    //Draw Geo Chart
    var chart = new google.visualization.GeoChart(document.getElementById('topmilitary_spending_div'));
    chart.draw(data, options);
} //topMilitaryExpenseResponseHandler

function shareOfGDPResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        hAxis: { title: 'Country' },
        vAxis: { title: 'Share of GDP in 2016(%)' }
    };
    //Draw Area Chart
    var chart = new google.visualization.AreaChart(document.getElementById('share_of_gdp_div'));
    chart.draw(data, options);
}//shareOfGDPResponseHandler



