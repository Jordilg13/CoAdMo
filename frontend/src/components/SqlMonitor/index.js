import React, { useState, useEffect } from 'react'
import agent from '../../agent/agent'
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Card } from '@material-ui/core';
import { CardHeader, CardBody } from 'reactstrap';
import colors from "./colors"


let initial_data = {
  labels: [],
  datasets: []
}

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: true,
  legend: {
    display: false,
  },
  responsive: true,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const SqlConnectionsTable = (props) => {
  const [barInfo, setBarInfo] = useState(false)
  const [finalData, setfinalData] = useState(initial_data)
  const [hasdata, sethasdata] = useState(false)


  useEffect(() => {
    agent.Services.getDefault("sql").then(data => {
      setBarInfo(data)
    })
  }, [])

  // CHART DATA PROCESSING
  useEffect(() => {

    let data = finalData

    if (barInfo) {
      barInfo.map((app,index) => {
        app['aplicacion'] = app['aplicacion'].trim()
        !data.labels.includes(app['bbdd']) && data.labels.push(app['bbdd'])

        // adds a new stack only if the app isn't in the array yet
        data.datasets.filter(e => e.label == app['aplicacion']).length == 0 && data.datasets.push({
          stack: "stack",
          label: app['aplicacion'],
          data: [],
          backgroundColor:  colors[index],
          hoverBackgroundColor:  colors[index].replace("0.6", "0.8"),
        })
      })

      // sets the number of conections inside each array of data
      data.labels.map((db, index_db) => {
        barInfo.map(app => {

          if (db == app['bbdd']) {
            data.datasets.map((ds, index_ds) => {

              if (ds.label == app['aplicacion']) {
                data.datasets[index_ds].data[index_db] = app['n_conexiones']
              }
            })
          }
        })
      })
      setfinalData(data)
      sethasdata(true)
    }
  }, [barInfo])

  return (
    <>
      <Card>
        <CardHeader>Conexiones SQL Server</CardHeader>
        <CardBody>
          <div className="chart-wrapper">
            {hasdata && <Bar data={finalData} options={options} />}
          </div>
        </CardBody>
      </Card>


    </>
  )
}

export default SqlConnectionsTable
