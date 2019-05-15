import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import { FacebookProvider, Page, MessageUs, CustomChat } from 'react-facebook';
import Footer from './footer';
import isEmail from 'validator/lib/isEmail';
import ReCAPTCHA from "react-google-recaptcha";
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import NextIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import amumu from '../Images/amumusad.png';
import Modal from 'react-responsive-modal';
import fortniteDab from '../Images/fortnitedab.png';
import axios from 'axios';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DotIcon from '@material-ui/icons/FiberManualRecord';

const styles = theme => ({
    chip: {
        minWidth: 350,
        margin: theme.spacing.unit,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
    fab: {
        margin: theme.spacing.unit,
        fontSize: 10,
        minWidth: 250,
        maxWidth: 250,
        [theme.breakpoints.up('lg')]: {
          fontSize: 12,
          minWidth: 250,
          maxWidth: 250,
        }
    },
    fbAvatar: {
        margin: 10,
        width: 50,
        height: 50,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#3F51B5',
      },
    emailAvatar: {
        margin: 10,
        width: 50,
        height: 50,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#b71c1c',
      },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        backgroundColor: '#fff',
        width: 240
      },
    resize:{
        fontSize:17
    },
    extendedIcon: {
        marginRight: theme.spacing.unit * 3,
    },
    descStyle: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
          fontSize: 15,
        }
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 15,
        [theme.breakpoints.up('sm')]: {
          fontSize: 20,
        }
    },
});

const ErrorStyle = {
    overlay: {
      background: "transparent"
    },
    modal: {
      backgroundColor: 'rgba(219, 105, 105, 0.9)',
      color: "white",
      borderRadius: '10px',
    },
}

const SuccessStyle = {
    overlay: {
      background: "transparent"
    },
    modal: {
      backgroundColor: 'rgba(124, 214, 105, 0.9)',
      color: "white",
      borderRadius: '10px',
      width: 400
    },
}

class Contact extends Component {

    state = {
        Url: this.props.server.main,
        name: "",
        email: "",
        subject: "",
        body: "",
        payload: "",
        ErrorModal: false,
        ErrorMsg: '',
        SuccessModal: false,
        SuccessMsg: '',
        captcha: ''
    }

updateInput(key, value) {
this.setState({ [key]: value });
}

onChange = (value) => {
this.setState({captcha: value})
}

onOpenModal = (type) => {
this.setState({[type]: true });
};

onCloseModal = (type) => {
this.setState({[type]: false });
};

verifier(){
    var headers = {
        'Content-Type': 'application/json'
    }
    var that = this;
    if (this.state.name.length < 3){
        this.setState({ErrorModal: true, ErrorMsg: "Name is required"})
    }
    else if (!isEmail(this.state.email)){
        this.setState({ErrorModal: true, ErrorMsg: "Email is invaild"})
    }
    else if (this.state.subject.length < 3){
        this.setState({ErrorModal: true, ErrorMsg: "Email subject is required"})
    }
    else if (this.state.body.length < 10){
        this.setState({ErrorModal: true, ErrorMsg: "You need to write something to email"})
    }
    else if(!this.state.captcha){
        this.setState({ErrorModal: true, ErrorMsg: "Check the captcha box"})
    }
    else {
        let Data = {from: this.state.email, subject: this.state.subject, text: this.state.body, name: this.state.name}
        axios.post(`${this.state.Url}sendEmail`, Data, {headers: headers})
        .then(function (response) {
            that.setState({SuccessModal: true, SuccessMsg: "Email Sent"})
        })
        .catch(function (error) {
                that.setState({
                ErrorModal:true,
                ErrorMsg:"Failed"
                })
        });
    }
}

render() {
const { classes } = this.props;
    return (
  <div>
    <div className="GG-BG-INVERSE"> 
    <Navbar page={2}/>
        <div class="container">
            <div class="BlackBG" style={{minHeight: 450}}>

                <div style={{height: 70}}>
                    <Grid container justify="center" alignItems="center">
                        <Chip
                                icon={<Avatar className={classes.fbAvatar}>F</Avatar>}
                                label={`Message us on facebook`}
                                className={classes.chip}
                                color="default"
                            />
                    </Grid>
                </div>

                <div style={{height: 50}}>
                    <Grid container justify="center" alignItems="center">
                        <FacebookProvider appId="1984023341904164">
                            <MessageUs messengerAppId="297486070967464" pageId="297486070967464"/>
                        </FacebookProvider>    
                    </Grid>
                </div> 

                <Grid container justify="center" alignItems="center">
                    <Chip
                            icon={<Avatar className={classes.emailAvatar}>@</Avatar>}
                            label={`Contact us by email`}
                            className={classes.chip}
                            color="default"
                        />
                </Grid>

                    <ListItem className={classes.descStyle}>
                        <ListItemText disableTypography primary={"Please only contact us with stuff related to the website or your puchases"} />
                    </ListItem>
                    <ListItem className={classes.descStyle}>
                        <ListItemText disableTypography primary={"If you found a bug take a screenshot and send it by email for your reward 😉"} />
                    </ListItem>
                    <Grid container justify="center" alignItems="center">
                        <Chip
                            color={'primary'}
                            label={'contact@ggegypt.com'}
                            className={classes.chip}
                        />
                    </Grid>
                    <ListItem className={classes.descStyle}>
                        <ListItemText disableTypography primary={"For business inquiries only contact us on the email below"} />
                    </ListItem>
                    <Grid container justify="center" alignItems="center">
                        <Chip
                            color={'primary'}
                            label={'admin@ggegypt.com'}
                            className={classes.chip}
                        />
                    </Grid>
            {/* <form className={classes.container} noValidate autoComplete="off">

                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Grid container justify="center" alignItems="center">
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                error={this.state.name.length < 2}
                                id="name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={e => this.updateInput('name', e.target.value)}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                    </div>

                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Grid container justify="center" alignItems="center">
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                error={!isEmail(this.state.email)}
                                id="email"
                                label="Your Email"
                                className={classes.textField}
                                value={this.state.email}
                                onChange={e => this.updateInput('email', e.target.value)}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                    </div>

                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Grid container justify="center" alignItems="center">
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                error={this.state.subject.length < 3}
                                id="Subject"
                                label="Email Subject"
                                className={classes.textField}
                                value={this.state.subject}
                                onChange={e => this.updateInput('subject', e.target.value)}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                    </div>

                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Grid container justify="center" alignItems="center">
                            <TextField
                                InputProps={{
                                    classes: {
                                        input: classes.resize,
                                    },
                                }}
                                multiline={true}
                                rows={4}
                                error={this.state.body.length < 10}
                                id="Subject"
                                label="Your Question"
                                className={classes.textField}
                                value={this.state.body}
                                onChange={e => this.updateInput('body', e.target.value)}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                    </div>
                    
                    <div className="recaptcha col-xs-12 col-md-12 col-lg-12">
                        <Grid container justify="center" alignItems="center">
                                <ReCAPTCHA
                                    onExpired={this.onExpired}
                                    sitekey="6LdZBo0UAAAAAHmWc3Anr9foEnlQNrzuNu-q1QZ2"
                                    onChange={this.onChange}
                                />
                        </Grid>
                    </div>

                    <div className="col-xs-12 col-md-12 col-lg-12">
                        <Grid container justify="center" alignItems="center">
                            <Fab color="primary" variant="extended" aria-label="Next" onClick={()=>{this.verifier()}} className={classes.fab}>
                                <NextIcon className={classes.extendedIcon} />
                                send
                            </Fab>
                        </Grid>
                    </div>

                </form> */}
            </div>
        </div>
        <Modal open={this.state.ErrorModal} onClose={this.onCloseModal.bind(this,'ErrorModal')} center
            styles={ErrorStyle}>
            <h3 className="col-xs-6">{this.state.ErrorMsg}</h3>
            <img style ={{width: 150, height: 120}} className="col-xs-6" src={amumu} alt=""></img> 
        </Modal>
        <Modal open={this.state.SuccessModal} onClose={this.onCloseModal.bind(this,'SuccessModal')} center
            styles={SuccessStyle}>
            <h3 class="col-xs-6">{this.state.SuccessMsg}</h3>
            <img style ={{width: 150, height: 120}} class="col-xs-6" src={fortniteDab} alt=""></img>
        </Modal>
        <Footer />
    </div>
  </div>
    );
  }
}

function mapStateToProps(state){
    return {
        server: state.server
    }
}
  
export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps),
)(Contact);