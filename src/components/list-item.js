import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import './list-item.css';
import TYPE_DISPLAY from '../enums/type-display';

const ListItem = ({ clickedPin, clickHandler, data, index }) => (
  <Card className={`list-item ${clickedPin === index ? 'highlight' : ''}`}>
    <div className="div-link" onClick={clickHandler}>
      <CardContent>
        <Typography className="name" variant="title">
          {data.name}
        </Typography>
        <Typography className="lyrics">
          <b>Description:</b> {data.description}
          <br />
          <b>Category:</b> {TYPE_DISPLAY[data.type]}
        </Typography>
        <Typography className="lyrics">
          <a
            className="lyrics"
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon fontSize="inherit">launch</Icon> Link
          </a>
        </Typography>
      </CardContent>
    </div>
  </Card>
);

export default ListItem;
