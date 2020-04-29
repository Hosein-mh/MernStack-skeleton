import React, {useState, useEffect} from 'react'
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect} from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
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

const initUserState = {
  name: '',
  email: '',
  password: ''
}

const EditProfile = function({match, classes}) {

  // Declare varibles and States
  const [user, setUser] = useState(initUserState);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [error, setError] = useState('');
  const {userId} = match.params;
  let jwt = false;

  useEffect(() => {
    jwt = auth.isAuthenticated();
    read({
      userId
    },{t: jwt.token}).then(data => {
      data.error ?
      setError(data.error) :
      setUser({...user, userId, name: data.name, email: data.email})
    })
  }, [])

  const clickSubmit = () => {
    jwt = auth.isAuthenticated()
    update({
      userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        setError( data.error)
      } else {
        setRedirectToProfile(true);
      }
    })
  }
  const handleChange = name => event => {
    setUser({...user, [name]: event.target.value})
  }

  if (redirectToProfile) {
    return (<Redirect to={'/user/' + match.params.userId}/>)
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Profile
        </Typography>
        <TextField id="name" label="Name" className={classes.textField} value={user.name} onChange={handleChange('name')} margin="normal"/><br/>
        <TextField id="email" type="email" label="Email" className={classes.textField} value={user.email} onChange={handleChange('email')} margin="normal"/><br/>
        <TextField id="password" type="password" label="Password" className={classes.textField} value={user.password} onChange={handleChange('password')} margin="normal"/>
        <br/> {
          error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="raised" onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
  )
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditProfile)
