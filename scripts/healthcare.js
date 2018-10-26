google.charts.load('current', { 'packages': ['corechart'] }); //load google charts
google.charts.load('current', { 'packages': ['scatter'] }); //load scatter charts package
google.charts.setOnLoadCallback(drawAllHealthcareCharts);

function drawAllHealthcareCharts() {

    drawCharts('HealthCare_Spending_in_USD',
        'SELECT A,B,C,D,E,F,G,H,I',
        healthcareExpenditureResponseHandler);
    drawCharts('HealthCare_Spending_in_USD',
        'SELECT A,K',
        healthcareMeanExpenditureResponseHandler);
    drawCharts('HealthCare_Spending_in_USD',
        'SELECT A,I',
        topHealthcareExpenseResponseHandler);
    drawCharts('HealthCare_Spending_in_USD',
        'SELECT A,I',
        fastestHealthcareExpenseResponseHandler2017);
    drawCharts('Healthcare_GDP',
        'SELECT A,E,F,G,H,I',
        healthcareGDPResponseHandler);
    drawCharts('Healthcare_GDP',
        'SELECT A,I ORDER BY I DESC LIMIT 5',
        healthcarePieGDPResponseHandler);
    drawCharts('GDPperCap',
        'SELECT A,B,C',
        gdppercapitaResponseHandler);
    drawCharts('GDPperCap',
        'SELECT A,C',
        perpersoncapitaResponseHandler);
    drawCharts('Public-PrivateSector',
        'SELECT A,B,C,D,E,F,G',
        sectorResponseHandler);
} //drawAllHealthcareCharts

function drawCharts(sheetName, query, responseHandler) {

    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1Fa-7KU9QY_Kpp5C2BjsDgxIVISDEse6zKiv-VwWq3ow/gviz/tq?sheet='

        + sheetName + '&headers=1&tq=' + queryString);
    console.log(query)
    query.send(responseHandler);
} //drawCharts

function checkError(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() +
            ' ' + response.getDetailedMessage());
        return;
    }
} //checkError

function healthcareExpenditureResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 8, desc: true });

    var options = {
        height: 500,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'HealthCare Expenditure in Millions (US$)' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('healthcare_expenditure_div'));
    chart.draw(data, options);
} //healthcareExpenditureResponseHandler

function healthcareMeanExpenditureResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 500,
        legend: 'none',
        backgroundColor: { fill: 'transparent' },
        bars: 'horizontal',
        hAxis: { title: 'HealthCare Average Expenditure in Millions (US$)' },
        vAxis: { title: 'Country' }
    };
    //Draw Bar Chart
    var chart = new google.visualization.BarChart(document.getElementById('healthcare_avg_div'));
    chart.draw(data, options);

}//healthcareMeanExpenditureResponseHandler

function topHealthcareExpenseResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 400,
        is3d: true,
        backgroundColor: { fill: 'transparent' },
        colorAxis: { colors: ['#45B39D', '#1A5276'] }, //blue to green
        title: 'Top 10 Countries in 2017 Millions ($)'
    };
    //Draw Geo Chart
    var chart = new google.visualization.GeoChart(document.getElementById('tophealth_spending_div'));
    chart.draw(data, options);
} //topHealthcareExpenseResponseHandler

function fastestHealthcareExpenseResponseHandler2017(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 500,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Heathcare Expenditure in Millions' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('fasthealth_spending_div'));
    chart.draw(data, options);
} //fastestHealthcareExpenseResponseHandler2017

function fastestHealthcareExpenseResponseHandler2016(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 600,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Heathcare Expenditure in Millions' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('fasthealth_spending_div'));
    chart.draw(data, options);

}//fastestHealthcareExpenseResponseHandler2016

function fastestHealthcareExpenseResponseHandler2015(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 600,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Heathcare Expenditure in Millions' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('fasthealth_spending_div'));
    chart.draw(data, options);

}//fastestHealthcareExpenseResponseHandler2015

function change() {
    selectedVal = $('#chart_div').val()
    if (selectedVal === '2016') {
        drawCharts('HealthCare_Spending_in_USD',
            'SELECT A,H',
            fastestHealthcareExpenseResponseHandler2016);

    }
    else if (selectedVal === '2015') {
        drawCharts('HealthCare_Spending_in_USD',
            'SELECT A,G',
            fastestHealthcareExpenseResponseHandler2015);
    }
    else {
        drawCharts('HealthCare_Spending_in_USD',
            'SELECT A,I',
            fastestHealthcareExpenseResponseHandler2017);
    }
}
//Change

function healthcareGDPResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });
    var options = {
        height: 600,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Country' },
        hAxis: { title: 'Healthcare GDP Percentage(%)' }

    };
    //Draw Bar Chart
    var chart = new google.visualization.BarChart(document.getElementById('healthcare_gdp_div'));
    chart.draw(data, options);

}//healthcareGDPResponseHandler

function healthcarePieGDPResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    var options = {
        backgroundColor: { fill: 'transparent' },
        title: 'Healthcare Expenditure as a Share of GDP in 2017'
    };
    ////Draw Pie Chart
    var chart = new google.visualization.PieChart(document.getElementById('healthcarepie_gdp_div'));
    chart.draw(data, options);
}//healthcarePieGDPResponseHandler

function gdppercapitaResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    var options = {
        height: 400,
        width: 600,
        backgroundColor: { fill: 'transparent' },
        chart: {
            title: 'Healthcarepercapita vs GDPpercapita',
        },
        hAxis: { title: 'Healthcarepercapita' },
        vAxis: { title: 'GDPpercapita' }
    };
    //Draw Scatter Chart
    var chart = new google.charts.Scatter(document.getElementById('gdp_per_capita_div'));
    chart.draw(data, google.charts.Scatter.convertOptions(options));
}//gdppercapitaResponseHandler

function perpersoncapitaResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Country' },
        hAxis: { title: 'Healthcare expenditure per person(US$)' }

    };
    var chart = new google.visualization.BarChart(document.getElementById('healthcare_per_person_div'));
    chart.draw(data, options);
}//perpersoncapitaResponseHandler

function sectorResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();

    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        vAxis: { title: 'Heathcare Expenditure in Public and Private Sectors' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('sector_spending_div'));
    chart.draw(data, options);
}//sectorResponseHandler

