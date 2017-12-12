import axios from 'axios'
require('../../secrets.js')

// action types
const SET_CURRENT = 'SET_CURRENT'
const SET_TOKEN = 'SET_TOKEN'
const SET_CORPUS = 'SET_CORPUS'
const SET_CHART_DATA = 'SET_CHART_DATA'

// action creators
const setCurr = (artist, song) => {
  song = song.indexOf(' - ') > -1 ? song.slice(0, song.indexOf(' - ')) : song
  return {
    type: SET_CURRENT,
    artist,
    song
  }
}

const setToken = token => ({ type: SET_TOKEN, token })

const setCorpus = corpus => {
  return {
    type: SET_CORPUS,
    corpus: corpus.replace(/\n+/g, '\n'),
    corpusHTML: corpus.replace(/\n+/g, '<br >')
  }
}

const parseSentences = arr => {
  return arr.map(obj => {
    return {
      x: obj.text.beginOffset,
      y: obj.sentiment.score,
      sentence: obj.text.content || 'No text'
    }
  })
}

const setChartData = googleResponse => {
  return {
    type: SET_CHART_DATA,
    data: {
      documentSentiment: googleResponse.documentSentiment,
      sentences: parseSentences(googleResponse.sentences)
    }
  }
}

// thunk middleware
export const storeToken = token => dispatch => dispatch(setToken(token))

export const passCorpusToChart = () => (dispatch, getState) => {
  const postBody = {
    encodingType: 'UTF8',
    document: {
      content: getState().spotify.corpus,
      type: 'PLAIN_TEXT'
    }
  }
  return axios
    .post(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${
        process.env.GOOGLE_API_KEY
      }`,
      postBody
    )
    .then(res => dispatch(setChartData(res.data)))
    .catch(err => console.error(err))
}

export const grabLyrics = _ => (dispatch, getState) => {
  return axios
    .get(
      `/api/lyrics/${encodeURIComponent(
        getState().spotify.currArtist
      )}/${encodeURIComponent(getState().spotify.currSong)}`
    )
    .then(res => dispatch(setCorpus(res.data.lyric)))
    .then(() => dispatch(passCorpusToChart()))
    .catch(() => dispatch(setCorpus('Could not find the song')))
}

// export const grabCurrSong = token => (dispatch, getState) => {
//   return axios
//     .get('https://api.spotify.com/v1/me/player/currently-playing', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(res => {
//       const apiArtist = res.data.item.artists[0].name,
//         apiSong = res.data.item.name;
//       if (
//         apiArtist !== getState().currArtist ||
//         apiSong !== getState().currSong
//       ) {
//         dispatch(setCurr(apiArtist, apiSong));
//         dispatch(grabLyrics());
//       }
//     });
// };

export const setCurrSong = (artist, song) => dispatch => {
  dispatch(setCurr(artist, song))
  dispatch(grabLyrics())
}

// reducer
export default (
  state = {
    data: {
      documentSentiment: 'default',
      sentences: 'default'
    },
    currSong: 'default',
    currArtist: 'default',
    corpus: 'Search for a song',
    corpusHTML: 'Search for a song',
    access_token: '',
    submitted: false
  },
  action
) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT:
      newState.currSong = action.song
      newState.currArtist = action.artist
      break

    case SET_TOKEN:
      newState.isLoggedIntoSpotify = true
      newState.access_token = action.token
      break

    case SET_CORPUS:
      newState.corpus = action.corpus
      newState.corpusHTML = action.corpusHTML
      newState.submitted = true
      break

    case SET_CHART_DATA:
      newState.data = action.data
      newState.submitted = true
      break

    default:
      return state
  }
  return newState
}
