import React from 'react';
import TextField from '@material-ui/core/TextField';

import './search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };
  }

  handleChange(event) {
    this.setState(
      {
        term: event.target.value.toLowerCase()
      },
      () => {
        this.props.changeHandler(this.state.term);
      }
    );
  }

  render() {
    return (
      <TextField
        value={this.state.name}
        onChange={this.handleChange.bind(this)}
        placeholder="Search"
      />
    );
  }
}

export default Search;
