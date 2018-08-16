import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import './list-item.css'

const ListItem = ({ data, clickHandler }) => (
  <Card className="list-item">
    <div className="div-link" onClick={clickHandler}>
      <CardContent>
        <Typography className="name" variant="title">
          {data.name}
        </Typography>
        <Typography className="song">Song: {data.song}</Typography>
        <Typography className="album">Album: {data.album}</Typography>
        <Typography className="lyrics">
          <a className="lyrics" href={data.lyricsLink} target="_blank">
            <Icon fontSize="inherit">launch</Icon> Lyrics
          </a>
        </Typography>
      </CardContent>
    </div>
  </Card>
)

export default ListItem
