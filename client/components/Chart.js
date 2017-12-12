import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryAxis,
  VictoryScatter,
  VictoryLine,
  VictoryTooltip
} from 'victory'

class Chart extends Component {
  docLength = arr => {
    let max = 0
    arr = Array.from(arr)
    arr.forEach(elem => {
      if (elem.x > max) max = elem.x
    })
    return max
  }
  domainX = _ => [-1, this.docLength(this.props.spotify.data.sentences)]
  domain = _ => {
    return {
      x: this.props.spotify.data.sentences ? this.domainX() : [-1, 10],
      y: [-1, 1]
    }
  }
  render () {
    console.log('spotify.data', this.props.spotify.data.sentences)
    return (
      <div id="vizBlock">
        <div id="vizTitle">
          <h2>CHART</h2>
        </div>

        <div id="vizChart">
          <VictoryChart
            domainPadding={5}
            theme={VictoryTheme.material}
            margin={{ top: 0, bottom: 0, left: 80, right: 40 }}
            padding={{ top: 20, bottom: 20, left: 30, right: 30 }}
            containerComponent={<VictoryVoronoiContainer responsive={false} />}
            domain={this.domain()}
            animate={{ duration: 500 }}
          >
            <VictoryAxis
              label="Length of Song"
              style={{
                axis: { stroke: '#756f6a' },
                axisLabel: { fontSize: 10, padding: 60 },
                ticks: { stroke: 'grey' },
                tickLabels: { fontSize: 10, padding: 5 }
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Sentiment"
              tickFormat={tick => {
                const domainStartAndEnd = this.domain().y
                if (domainStartAndEnd.indexOf(tick) > -1) {
                  return tick === -1 ? '-1 (neg)' : '1 (pos)'
                } else {
                  return tick
                }
              }}
              style={{
                axis: { stroke: '#756f6a' },
                axisLabel: { fontSize: 10, padding: 40 },
                ticks: { stroke: 'grey' },
                tickLabels: { fontSize: 10, padding: 5 }
              }}
            />
            <VictoryScatter
              data={
                this.props.spotify.data.sentences &&
                this.props.spotify.data.sentences
              }
              size={(datum, active) => (active ? 5 : 3)}
            />
            <VictoryLine
              data={
                this.props.spotify.data.sentences &&
                this.props.spotify.data.sentences
              }
              labels={datum => `'${datum.sentence}' \n ${datum.y}`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={1}
                  style={{
                    fontSize: 20,
                    padding: 5,
                    fill: '#FFFFFF'
                  }}
                  flyoutStyle={{
                    stroke: 'none',
                    fill: '#9A393C'
                  }}
                />
              }
              interpolation="basis"
            />
          </VictoryChart>
        </div>
      </div>
    )
  }
}

const mapState = ({ spotify }) => ({ spotify })
export default connect(mapState)(Chart)
