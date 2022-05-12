
// BROKEN

let layout = {
}
let headerNames = []
let count = 0
let csv = Papa.parse('boosted.csv', {
    download: true,
    step: function (results, parser) {
        
        if (results.errors.length > 0) console.log("Row errors:", results.errors)
        else if (count === 0) headerNames = results.data
        else {
            for (i = 0; i < headerValues.length; i++) {
                cellValue = results.data[i], headerValues[i]
                cellValues[i] = cellValue
                console.log(cellValue)
            }
        }
        count++
    },
    complete: function(rows, file) {

        let table = {
            type: 'table',
            // columnwidth: [500, 500, 500, 500, 500, 500, 500,500, 500],
            columnorder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            header: {
                values: [],
                align: "center",
                line: { width: 1, color: 'rgb(50, 50, 50)' },
                fill: { color: ['rgb(235, 100, 230)'] },
                font: { family: "Arial", size: 11, color: "white" }
            },
            cells: {
                values: [],
                align: ["center", "center"],
                line: { color: "black", width: 1 },
                fill: { color: ['rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)'] },
                font: { family: "Arial", size: 10, color: ["black"] }
            },
            xaxis: 'x',
            yaxis: 'y',
        }
        
        let pie = {
            values: [],
            labels: [],
            type: 'pie'
        }

        Plotly.newPlot('table', [table], layout)
        // Plotly.newPlot('chart', [pie], layout)

        // cell values
        var cellValues = []

        console.log(cellValues)
    }
})