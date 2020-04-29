import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Card, {CardContent, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import seashellImg from './../assets/images/seashell.jpg'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
})


const Home = ({ classes }) => {
  return (
    <Card className={classes.card}>
      <Typography variant="headline" className={classes.title}>
        Home Page
      </Typography>
      <CardMedia className={classes.media} image={seashellImg} title="Unicorn Shells"/>
      <CardContent>
        <Typography variant="body1">
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>
    </Card>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
