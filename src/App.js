/* eslint-env browser */

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const article = `
Kennisinstituut: dyslexie komt niet door slecht onderwijs
 
Dat slecht onderwijs de oorzaak zou zijn van de problemen die dyslectische kinderen hebben met lezen, spellen en schrijven, is flauwekul. Dat zegt het Nederlands Kwaliteitsinstituut Dyslexie (NKD), dat de diagnostiek en behandeling van dyslexie bewaakt. Het instituut noemt de berichtgeving die een verband legt tussen slecht onderwijs en dyslexie kwalijk. 
 
"Voor kinderen die ernstig dyslectisch zijn geldt dat onderwijs, zelfs van de hoogste kwaliteit, geen oplossing kan bieden", zegt Remco Reij van het NKD.
 
Volgens het NKD hebben kinderen met dyslexie een neurobiologische stoornis, waarbij het taalgebied in de hersenen anders is aangelegd. Deze kinderen vinden het moeilijk om de combinatie te maken tussen letters en klanken.
 
In het AD zeggen drie hoogleraren dat onnodig veel kinderen worden gediagnosticeerd met dyslexie. Hoogleraar Anna Bosman van de Radboud Universiteit in Nijmegen concludeert dat dyslexie komt door slecht onderwijs. "Er wordt gewoon te weinig geoefend", zegt ze.

'Geen twijfel'
 
"Aan het feit dat dyslexie bestaat, twijfelt geen enkele zichzelf respecterende wetenschapper", zegt Reij van het kwaliteitsinstituut. Hij meent dat in het artikel dyslexie op een hoop wordt gegooid met andere leesproblemen.
 
Via sociale media reageren veel mensen met dyslexie die niet begrijpen dat de aandoening wordt ontkend. Richard Kerkhof schrijft in een tweet aan de NOS: "Als dyslect vind ik het kort door de bocht. Mijn ouders en ik hebben er alles aan gedaan, maar ik heb het nog steeds. Door te zeggen dat het niet bestaat doe je veel mensen te kort. Ik hoef geen medelijden of zo, maar dit is te makkelijk.
`

const splitTextAtCharIndex = (text, charIndex) => {
  const before = text.slice(0, charIndex)
  let after = text.slice(charIndex, text.length).split(' ')
  let currentWord
  if (after.length && after[0] !== '') {
    currentWord = after.shift()
    after = after.join(' ')
  } else after = text
  return {
    before,
    currentWord,
    after
  }
}

/* create <br /> react nodes for new lines in string */
const renderText = (text) =>
  text.split('\n').map((item, index) =>
      index === 0 ? item : [<br />, item])

const renderHighlight = (before, currentWord, after) => {
  return <p className='App-intro'>
    <span>{renderText(before)}</span>
    <span style={{backgroundColor: 'yellow'}}>{renderText(currentWord + ' ')}</span>
    <span>{renderText(after)}</span>
  </p>
}

class App extends Component {

  constructor (props) {
    super(props)

    const u = new SpeechSynthesisUtterance()
    u.text = article
    u.lang = 'nl-nl'
    u.rate = 1.0

    u.onboundary = (e) => {
      this.setState(splitTextAtCharIndex(u.text, e.charIndex))
    }

    const synth = speechSynthesis
    synth.cancel()

    this.state = {
      u,
      synth,
      before: '',
      currentWord: '',
      after: u.text
    }
  }

  render () {
    const { before, currentWord, after, u, synth } = this.state
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>dyslexia reader</h2>
        </div>
        <button onClick={() => synth.speak(u)}>
          Start
        </button>
        <button className='Stop' onClick={() => synth.cancel()}>
          Stop
      </button>
        { renderHighlight(before, currentWord, after) }
      </div>
    )
  }
}

export default App
