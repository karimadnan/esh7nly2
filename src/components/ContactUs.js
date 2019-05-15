import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import { FacebookProvider, MessageUs} from 'react-facebook';
import Footer from './footer';
import isEmail from 'validator/lib/isEmail';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import amumu from '../Images/amumusad.png';
import Modal from 'react-responsive-modal';
import fortniteDab from '../Images/fortnitedab.png';
import axios from 'axios';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import {connect} from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';

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
        copied: false
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

render() {
const { classes } = this.props;
const { t } = this.props;
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
                                label={t('contactFBTitle')}
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
                            label={t('contactEmailTitle')}
                            className={classes.chip}
                            color="default"
                        />
                </Grid>

                    <ListItem className={classes.descStyle}>
                        <ListItemText disableTypography primary={t('contactRule1')} />
                    </ListItem>
                    <ListItem className={classes.descStyle}>
                        <ListItemText disableTypography primary={t('contactRule2')} />
                    </ListItem>
                    <Grid container justify="center" alignItems="center">
                        <CopyToClipboard text={`contact@ggegypt.com`}>
                            <Tooltip  title={<h4>{t('copyEmail')}</h4>} aria-label={t('copylink')} placement="right">
                                <Chip
                                    onClick={()=>{this.setState({copied: true})}}
                                    color={'primary'}
                                    label={'contact@ggegypt.com'}
                                    className={classes.chip}
                                />
                            </Tooltip>
                        </CopyToClipboard>
                    </Grid>
                    <ListItem className={classes.descStyle}>
                        <ListItemText disableTypography primary={t('contactAdmin')} />
                    </ListItem>
                    <Grid container justify="center" alignItems="center">
                        <CopyToClipboard text={`admin@ggegypt.com`}>
                            <Tooltip title={<h4>{t('copyEmail')}</h4>} aria-label={t('copylink')} placement="right">
                                <Chip
                                    onClick={()=>{this.setState({copied: true})}}
                                    color={'primary'}
                                    label={'admin@ggegypt.com'}
                                    className={classes.chip}
                                />
                            </Tooltip>
                        </CopyToClipboard>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={this.state.copied}
                        onClose={()=>{this.setState({ copied: false })}}
                        transitionDuration={500}
                        autoHideDuration={1000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<h4 id="message-id">{t('copiedEmail')}</h4>}
                    />
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