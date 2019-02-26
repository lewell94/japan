import React from 'react'
import { graphql } from "gatsby"

import Filter from '../components/filter'
import Layout from '../components/layout'
import ListItem from '../components/list-item'
import Map from '../components/map'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clickedCard: null,
      clickedPin: null,
      filteredType: ""
    }
  }

  onCardClick(cardIndex) {
    this.setState({
      clickedCard: cardIndex,
    })
  }

  onTypeFilterChange(type) {
    this.setState({
      filteredType: type
    })
  }

  render() {
    const listItems = this.props.data.allContentfulLocation.edges.reduce((elements, reference, i) => {
      const showElement = this.state.filteredType === ""
        || this.state.filteredType === "all"
        || this.state.filteredType === reference.node.type

      if (showElement) {
        elements.push(
          <ListItem
            key={reference.node.id}
            data={reference.node}
            clickHandler={this.onCardClick.bind(this, i)}
          />
        )
      }

      return elements
    }, [])

    return (
      <Layout>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '20%', height: '100vh', overflowY: 'scroll' }}>
            <Filter changeHandler={this.onTypeFilterChange.bind(this)}></Filter>
            {listItems}
          </div>
          <div style={{ width: '80%', height: '100vh' }}>
            <Map
              data={this.props.data.allContentfulLocation.edges}
              clickedCard={this.state.clickedCard}
              filteredType={this.state.filteredType}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  {
    allContentfulLocation {
      edges {
        node {
          id
          name
          description
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
