## Groovy or Gloomy?

Groovy or Gloomy is an application aimed at helping you build the most cohesive playlist imaginable.

Groovy or Gloomy was initially created during a weekend hackathon at Fullstack Academy. It was then refactored and cleaned up a bit. I plan to deploy it to Firebase in the coming days. It is built on top of the Fullstack Academy boilmaker boilerplate.

With the app you can search for a song with its title and artist and it will return to you the songs lyrics and a visualized sentiment analysis of the songs lyrics. If you were ever wondering why the song you love so much turned people away, it might be a good song to test out.

I will continue to update G/G from time to time as it is a small pet project I really enjoy working on and sharing with my friends.

# Installation

Clone the repo and run `yarn install` or simply `yarn` to install all dependecies. A database will be created but is not yet functional. I plan to add spotify integration so you can search for the song you are currently listening to as well.

After all the dependencies have been installed all you need to do is run `yarn start-dev` as it is still in development, et violà the app is up and running.

# API Keys

An important note is that the application requires API keys from spotify and google to run properly. The spotify keys are not required as of this current iteration. The google API keys are required though as the app uses the Google Cloud Natural Language Processing API to create the sentiment analysis.

Create a file called `secrets.js` or `keys.js` and make sure to add them to your `.gitignore`. This file should look like this:

```js
process.env.SPOTIFY_CLIENT_ID = 'YOUR SPOTIFY CLIENT ID'
process.env.SPOTIFY_CLIENT_SECRET = 'YOUR SPOTIFY CLIENT SECRET'
process.env.SPOTIFY_CALLBACK_URI = 'YOUR SPOTIFY REDIRECT URI'
process.env.GOOGLE_API_KEY = 'YOUR GOOGLE API KEY'
```

You can make them process environment variables for easy access or make them variables you `require` or `import` into the required files. Without these keys there is no way to communicate with Spotify and Google.

# On the Docket

* Round out Spotify integration
* Deploy to Firebase
* Find suitable url
* Add stylesheets

Made by @mueedc
