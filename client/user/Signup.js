import React, { useState } from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {create} from './api-user.js'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog'
import {Link} from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
})

const initState = {
  name: '',
  password: '',
  email: ''
};

const Signup = function({ classes }) {
  // Declares States
  const [user, setUser] = useState(initState);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleChange = name => event => {
    setUser({...user, [name]: event.target.value});
  }

  const clickSubmit = () => {
    create(user).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setError('');
        setOpen(true);
      }
    })
  }

  return (<div>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Sign Up
        </Typography>
        <TextField id="name" label="Name" className={classes.textField} value={user.name} onChange={handleChange('name')} margin="normal"/><br/>
        <TextField id="email" type="email" label="Email" className={classes.textField} value={user.email} onChange={handleChange('email')} margin="normal"/><br/>
        <TextField id="password" type="password" label="Password" className={classes.textField} value={user.password} onChange={handleChange('password')} margin="normal"/>
        <br/> {
          error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {error}</Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="raised" onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
    <Dialog open={open} disableBackdropClick={true}>
      <DialogTitle>New Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          New account successfully created.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Link to="/signin">
          <Button color="primary" autoFocus="autoFocus" variant="raised">
            Sign In
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  </div>)
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Signup)
