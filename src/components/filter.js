import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './filter.css'
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
      <FormControl>
        <InputLabel htmlFor="filter-type">Filter by Type</InputLabel>
        <Select
          value={this.state.selectedType} 
          onChange={this.updateSelectedType.bind(this)}
          inputProps={{
            id: 'filter-type'
          }}
        >
          <MenuItem value="all">All</MenuItem>
          {Object.keys(TYPE_DISPLAY).map((key, i) => (
            <MenuItem key={i} value={key}>{TYPE_DISPLAY[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

export default Filter