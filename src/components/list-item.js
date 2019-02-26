import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import './list-item.css'
import TYPE_DISPLAY from '../enums/type-display';

const ListItem = ({ data, clickHandler }) => (
  <Card className="list-item">
    <div className="div-link" onClick={clickHandler}>
      <CardContent>
        <Typography className="name" variant="title">
          {data.name}
        </Typography>
        <Typography className="lyrics">
          {TYPE_DISPLAY[data.type]}
        </Typography>
        <Typography className="lyrics">
          <a className="lyrics" href={data.link} target="_blank">
            <Icon fontSize="inherit">launch</Icon> Link
          </a>
        </Typography>
      </CardContent>
    </div>
  </Card>
)

export default ListItem
