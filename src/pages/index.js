import React from 'react';
import { graphql } from 'gatsby';

import Filter from '../components/filter';
import Layout from '../components/layout';
import ListItem from '../components/list-item';
import Map from '../components/map';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.listContainerRef = React.createRef();
    this.state = {
      clickedCard: null,
      clickedPin: null,
      filteredType: ''
    };
  }

  onCardClick(cardIndex) {
    this.setState({
      clickedCard: cardIndex,
      clickedPin: null
    });
  }

  onPinClick(event) {
    const { index } = event.target;

    this.setState(
      {
        clickedCard: null,
        clickedPin: index
      },
      () => {
        let childIndex = -1;

        for (let child of this.listContainerRef.current.children) {
          if (childIndex !== this.state.clickedPin) {
            childIndex++;
          } else {
            this.listContainerRef.current.scrollTo(0, child.offsetTop);
            break;
          }
        }

        setTimeout(() => {
          this.setState({
            clickedPin: null
          });
        }, 500);
      }
    );
  }

  onTypeFilterChange(type) {
    this.setState({
      filteredType: type
    });
  }

  render() {
    const listItems = this.props.data.allContentfulLocation.edges.reduce(
      (elements, reference, i) => {
        const showElement =
          this.state.filteredType === '' ||
          this.state.filteredType === 'all' ||
          this.state.filteredType === reference.node.type;

        if (showElement) {
          elements.push(
            <ListItem
              clickedPin={this.state.clickedPin}
              clickHandler={this.onCardClick.bind(this, i)}
              data={reference.node}
              index={i}
              key={reference.node.id}
            />
          );
        }

        return elements;
      },
      []
    );

    return (
      <Layout>
        <div style={{ display: 'flex' }}>
          <div
            style={{ width: '20%', height: '100vh', overflowY: 'scroll' }}
            ref={this.listContainerRef}
          >
            <Filter changeHandler={this.onTypeFilterChange.bind(this)} />
            {listItems}
          </div>
          <div style={{ width: '80%', height: '100vh' }}>
            <Map
              clickedCard={this.state.clickedCard}
              clickHandler={this.onPinClick.bind(this)}
              filteredType={this.state.filteredType}
              data={this.props.data.allContentfulLocation.edges}
            />
          </div>
        </div>
      </Layout>
    );
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
`;

export default IndexPage;
