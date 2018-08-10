import React from 'react'

import ListItem from '../components/list-item'
import Map from '../components/map'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clickedCard: null,
      clickedPin: null,
    }
  }

  onCardClick(cardIndex) {
    this.setState({
      clickedCard: cardIndex,
    })
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20%', height: '100vh', overflowY: 'scroll' }}>
          {this.props.data.allContentfulReference.edges.map((reference, i) => (
            <ListItem key={reference.node.id} data={reference.node} clickHandler={this.onCardClick.bind(this, i)} />
          ))}
        </div>
        <div style={{ width: '80%', height: '100vh' }}>
          <Map data={this.props.data.allContentfulReference.edges} clickedCard={this.state.clickedCard} />
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query ReferencesQuery {
    allContentfulReference {
      edges {
        node {
          id
          name
          song
          album
          lyricsLink
          lat
          lng
        }
      }
    }
  }
`

export default IndexPage
