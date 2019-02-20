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
          {this.props.data.allContentfulLocation.edges.map((reference, i) => (
            <ListItem key={reference.node.id} data={reference.node} clickHandler={this.onCardClick.bind(this, i)} />
          ))}
        </div>
        <div style={{ width: '80%', height: '100vh' }}>
          <Map data={this.props.data.allContentfulLocation.edges} clickedCard={this.state.clickedCard} />
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query ReferencesQuery {
    allContentfulLocation {
      edges {
        node {
          id
          name
          link
          lat
          lng
          type
        }
      }
    }
  }
`

export default IndexPage
