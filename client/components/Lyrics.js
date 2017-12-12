import React from 'react'
import { connect } from 'react-redux'

const Lyrics = ({ spotify }) => (
  <div>
    <h2>LYRICS</h2>
    <div dangerouslySetInnerHTML={{ __html: spotify.corpusHTML }} />
  </div>
)

const mapState = ({ spotify }) => ({ spotify })
export default connect(mapState)(Lyrics)
