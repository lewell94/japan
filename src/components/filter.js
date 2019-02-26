import React from 'react'

import TYPE_DISPLAY from '../enums/type-display'

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedType: ""
    }
  }

  updateSelectedType(event) {
    this.setState({
      selectedType: event.target.value
    }, () => {
      this.props.changeHandler(this.state.selectedType)
    })
  }

  render() {
    return (
      <select value={this.state.selectedType} onChange={this.updateSelectedType.bind(this)}>
        <option value="" disabled>Filter by Type</option>
        <option value="all">All</option>
        {Object.keys(TYPE_DISPLAY).map((key, i) => (
          <option key={i} value={key}>{TYPE_DISPLAY[key]}</option>
        ))}
      </select>
    )
  }
}

export default Filter