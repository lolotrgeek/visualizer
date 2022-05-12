
function sorter(rows) {
    let sorted = [...rows]
    return sorted.sort((a, b) => a['Project name'].localeCompare(b['Project name']))
}

function namer(rows) {
    let names = []
    rows.forEach(row => {
        let found = names.find(name => name === row['Project name'])
        if (!found) names.push(row['Project name'])
    })
    return names
}

function duration(rows) {
    let projects = []

    rows.forEach((row, index) => {
        if(index === 0) projects.push({ project: { name: row['Project name'], duration: 0 } })
        let found = projects.findIndex(project => {
            if(typeof project === 'object') return project.name === row['Project name']
            else return false
            
        })
        if (found === -1) projects.push({ project: { name: row['Project name'], duration: 0 } })
        else if (found > -1) {
            console.log("found", row['Project name'])
            projects[found].project.duration += new Date(`${row["Date"]} ${row["End time"]}`) - new Date(`${row["Date"]} ${row["Start time"]}`)
        }
    })
    return projects
}

d3.csv("event_tracker.csv", function (err, rows) {
    // console.log(sorter(rows))
    // console.log(namer(rows))
    // console.log(duration(rows))
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key] })
    }

    // header values
    let headerValues = d3.keys(rows[0])

    // cell values
    var cellValues = []
    for (i = 0; i < headerValues.length; i++) {
        cellValue = unpack(rows, headerValues[i])
        cellValues[i] = cellValue
    }

    let table = {
        type: 'table',
        // columnwidth: [500, 500, 500, 500, 500, 500, 500,500, 500],
        columnorder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        header: {
            values: headerValues,
            align: "center",
            line: { width: 1, color: 'rgb(50, 50, 50)' },
            fill: { color: ['rgb(235, 100, 230)'] },
            font: { family: "Arial", size: 11, color: "white" }
        },
        cells: {
            values: cellValues,
            align: ["center", "center"],
            line: { color: "black", width: 1 },
            fill: { color: ['rgb(235, 193, 238)', 'rgba(228, 222, 249, 0.65)'] },
            font: { family: "Arial", size: 10, color: ["black"] }
        },
        xaxis: 'x',
        yaxis: 'y',
        // domain: { x: [0, 0.4], y: [0, 1] }
    }



    let pie = {
        values: [],
        labels: namer(rows),
        type: 'pie'
    }


    let layout = {
    }

    Plotly.newPlot('table', [table], layout)

})
