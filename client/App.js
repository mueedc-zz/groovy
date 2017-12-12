import React from 'react'
import { SongForm, Lyrics, Chart } from './components'

const App = () => (
  <div>
    <h1>Groovy or Gloomy?</h1>
    <SongForm />
    <br />
    <Chart />
    <br />
    <Lyrics />
  </div>
)

export default App
