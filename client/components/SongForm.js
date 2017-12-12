import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrSong, grabLyrics } from '../store/spotify'
class SongForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      song: '',
      artist: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, type) {
    this.setState({ [type]: event.target.value })
  }

  render () {
    return (
      <div>
        <form onSubmit={evt => this.props.handleSubmit(evt)}>
          <label>Artist</label>
          <input
            type="text"
            name="artist"
            onChange={event => this.handleChange(event, 'artist')}
          />
          <label>Song</label>
          <input
            type="text"
            name="song"
            onChange={event => this.handleChange(event, 'song')}
          />
          <button type="submit">Let's Jam</button>
        </form>
      </div>
    )
  }
}

const mapState = null
const mapDispatch = dispatch => ({
  handleSubmit (event) {
    event.preventDefault()
    const song = event.target.song.value
    const artist = event.target.artist.value
    dispatch(setCurrSong(artist, song))
    dispatch(grabLyrics())
  }
})
export default connect(mapState, mapDispatch)(SongForm)
