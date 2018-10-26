//google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawAllEduCharts);

function drawAllEduCharts() {
    drawChart('Education_in_USD',
        'SELECT A,B,C,D,E,F,G,H',
        educationExpenditureResponseHandler);
    drawChart('Education_in_USD',
        'SELECT A,H',
        topEducationExpenditureResponseHandler);
    drawChart('Education_Expenditure_asGDP',
        'SELECT A,B,C,D,E,F,G,H',
        EducationExpenditureasGDPResponseHandler);
    drawChart('Education_Expenditure_asGDP',
        'SELECT A,H',
        topEducationExpenditureasGDPResponseHandler);
    drawChart('Education_Expenditure_asGDP',
        'SELECT A,H ORDER BY H DESC LIMIT 5',
        topfiveResponseHandler);
    drawChart('PrimarySecondaryExpense',
        'SELECT A,H',
        perCapitaResponseHandler);
    drawChart('TertiaryExpense',
        'SELECT A,H',
        perCapitaTertiaryResponseHandler);
}//drawAllEduCharts

function drawChart(sheetName, query, responseHandler) {

    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1snqCSnqeS1_BnFQLWufnxd4EUkcQhsnvRuWt7rCEUEg/gviz/tq?sheet='
        + sheetName + '&headers=1&tq=' + queryString);
    console.log(query)
    query.send(responseHandler);
} //drawChart

function checkError(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() +
            ' ' + response.getDetailedMessage());
        return;
    }
} //checkError

function educationExpenditureResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 7, desc: true });

    var options = {
        height: 500,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Education Expenditure in Billions (US$)' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('education_expense_div'));
    chart.draw(data, options);
}//educationExpenditureResponseHandler

function topEducationExpenditureResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 500,
        backgroundColor: { fill: 'transparent' },
        hAxis: { title: 'Education Expenditure in 2016 (Billion$)' },
        vAxis: { title: 'Country' }
    };
    //Draw Bar Chart
    var chart = new google.visualization.BarChart(document.getElementById('top_education_expense_div'));
    chart.draw(data, options);
}//topEducationExpenditureResponseHandler


function EducationExpenditureasGDPResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 7, desc: true });

    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        vAxis: { title: 'Education Expenditure as a percentage of GDP' },
        hAxis: { title: 'Country' }
    };
    //Draw Column Chart
    var chart = new google.visualization.ColumnChart(document.getElementById('education_gdp_div'));
    chart.draw(data, options);
}//EducationExpenditureasGDPResponseHandler

function topEducationExpenditureasGDPResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 500,
        backgroundColor: { fill: 'transparent' },
        title: ' Highest Education Expenditure in % of GDP in 2016',
        vAxis: { title: 'Percentage of GDP(%)' },
        hAxis: { title: 'Country' }
    };
    //Draw Area Chart
    var chart = new google.visualization.AreaChart(document.getElementById('top_spending_div'));
    chart.draw(data, options);
}//topEducationExpenditureasGDPResponseHandler

function topfiveResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();

    var options = {
        height: 400,
        backgroundColor: { fill: 'transparent' },
        title: 'Top 5 Counties in Education Expenditure',
        hAxis: { title: 'Percentage of GDP(%)' },
        vAxis: { title: 'Country' }
    };
    //Draw Bar Chart
    var chart = new google.visualization.BarChart(document.getElementById('top_five_spending_div'));
    chart.draw(data, options);
}//topfiveResponseHandler

function perCapitaResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 500,
        backgroundColor: { fill: 'transparent' },
        colors: ['#8521ff'],
        title: 'Mean Education Expenditure Per Person in USD($) for primary and secondary education(2010-2016)',
        hAxis: { title: 'Expenditure per person (US$)' },
        vAxis: { title: 'Country' }
    };
    //Draw Bar Chart
    var chart = new google.visualization.BarChart(document.getElementById('percap_spending_div'));
    chart.draw(data, options);
}//perCapitaResponseHandler

function perCapitaTertiaryResponseHandler(response) {

    checkError(response);
    var data = response.getDataTable();
    data.sort({ column: 1, desc: true });

    var options = {
        height: 500,
        backgroundColor: { fill: 'transparent' },
        colors: ['#ffb833'],
        title: 'Mean Education Expenditure Per Person in USD($) for Tertiary Education(2010-2016)',
        hAxis: { title: 'Expenditure per person (US$)' },
        vAxis: { title: 'Country' }
    };
    //Draw Bar Chart
    var chart = new google.visualization.BarChart(document.getElementById('percapter_spending_div'));
    chart.draw(data, options);
}//perCapitaTertiaryResponseHandler

