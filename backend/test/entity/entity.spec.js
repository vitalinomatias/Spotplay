import { expect } from 'chai'
import { describe, it } from 'mocha'
import Song from '../../entity/Song.js'

// escribieno un test
describe('testing song class', () => {
// setup class and instance
  const song = new Song({
    title: 'title',
    uri: 'uri',
    duration: 'duration',
    image: 'image',
    idArtist: 'idArtist',
    idGenere: 'idGenere'
  })

  it('should is not null', () => {
    expect(song).to.not.be.equal(null)
  })
  it('Should have a title', () => {
    expect(song._title).to.equal('title')
  })
  it('should return a number', () => {
    const result = song.returnNumber()
    expect(result).to.equal(5)
  })
})
