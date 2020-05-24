import { Button, CardBody, CardHeader } from 'reactstrap';
import React, { useEffect, useState } from 'react'

import { Bar } from 'react-chartjs-2';
import { Card } from '@material-ui/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import agent from '../../agent/agent'
import colors from "./colors"
import { faSync } from '@fortawesome/free-solid-svg-icons'

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
  const [reference, setreference] = useState(false)

  const refreshData = () => {
    agent.Services.getDefault("sql").then(data => {
      setBarInfo(data)
      console.log("SqlConnectionsTable -> barInfo", barInfo)

    })
  }

  useEffect(() => {
    setInterval(() => {
      refreshData()
    }, 3000);
  }, [])


  useEffect(() => {
    refreshData()
  }, [])

  // CHART DATA PROCESSING
  useEffect(() => {
    let data = finalData

    if (barInfo) {
      barInfo.map((app, index) => {
        app['aplicacion'] = app['aplicacion'].trim()
        !data.labels.includes(app['bbdd']) && data.labels.push(app['bbdd'])

        // adds a new stack only if the app isn't in the array yet
        data.datasets.filter(e => e.label == app['aplicacion']).length == 0 && data.datasets.push({
          stack: "stack",
          label: app['aplicacion'],
          data: [],
          backgroundColor: colors[index],
          hoverBackgroundColor: colors[index].replace("0.6", "0.8"),
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
      reference && reference.chartInstance.update()


    }
  }, [barInfo])

  return (
    <>
      <Card>
        <CardHeader>
            Conexiones SQL Server
            <Button size="sm" onClick={refreshData} className="pull-right">
              <FontAwesomeIcon icon={faSync} />
            </Button>
        </CardHeader>
        <CardBody>

          <div className="chart-wrapper">
            {hasdata && <Bar data={finalData} options={options} ref={ref => setreference(ref)} />}
          </div>
        </CardBody>
      </Card>


    </>
  )
}

export default SqlConnectionsTable
