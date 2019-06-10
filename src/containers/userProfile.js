import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import i18next from 'i18next';
import Person from '@material-ui/icons/VerifiedUser';
import Mood from '@material-ui/icons/Favorite';
import Email from '@material-ui/icons/Email';
import StayPrimaryPortrait from '@material-ui/icons/StayPrimaryPortrait';
import Whatshot from '@material-ui/icons/Redeem';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Pp from '../Images/avatar.png';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import NextIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import UploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose';
import { withNamespaces } from 'react-i18next';
import {connect} from 'react-redux';
import Loader from '../containers/loader';

const styles = theme => ({
    Avatar: {
        margin: 10,
        width: 150,
        height: 150,
      },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon2: {
        marginRight: theme.spacing.unit * 3,
    },
});

class UserProfile extends Component {

    state = {
        ErrorModal: false,
        ErrorMsg: '',
        headers: {
            'Content-Type': 'application/json',
            'authorization': this.props.loginData.token},
        Url: this.props.server.main,
        status: '',
        email: '',
        phone: '',
        health: '',
        photo: '',
        vouchPoints: '',
        actKey: ''
    }

    componentDidMount(){
        this.getUserData();
    }

    onOpenModal = (type) => {
        this.setState({[type]: true });
        };
        
    onCloseModal = (type) => {
        this.setState({[type]: false });
    };

    getUserData(){
        let Data = {token: this.props.loginData.token}
        var that = this
        axios.post(this.state.Url+"getUserbyId", Data, {headers: this.state.headers})
        .then(function (response) {
            const info = response.data.doc
            that.setState({status: info.status, 
                email: info.Email,
                phone: info.Phone,
                health: info.health,
                vouchPoints: info.VouchPoints,
                photo: info.Photo})
        })
        .catch(function (error) {
            // console.log(error.response.data.message, "FAIL")
        })
    }

    
    validatePendingUser(){
        const { t } = this.props;
        var that = this
        if(this.state.actKey.length === 6){
            axios.get(this.state.Url+`validateUser?code=${this.state.actKey}`, {headers: this.state.headers})
            .then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                that.setState({
                    ErrorModal:true,
                    ErrorMsg:error.response.data.message
                })
            })
        }
        else{
            this.setState({
                ErrorModal:true,
                ErrorMsg: `${t('actKeyError')}`
            })
        }
    }

    healthBar(health){
        var i;
        var hearts = []
            for (i = 0; i < health; i++) {
                hearts.push(<span key={i} className="svg-icon svg-icon-hearts"/>)
            }
            for (i = 0; i < 3-health; i++) {
                hearts.push(<span key={i} className="svg-icon svg-icon-emptyHearts"/>)
            }
          return hearts
    }

        // setPhoto(photo){
    //     let data = {photo: photo}
    //     var that = this
    //     axios.post(this.state.Url+"setUserPhoto", data, {headers: this.state.headers})
    //     .then(function (response) {
    //         that.props.updateProfilePhoto(photo)
    //     })
    //     .catch(function (error) {
    //         console.log(error, "ERROR")
    //     })
    // }

    // getFbPhoto (){
    //     var that = this
    //     window.FB.api(
    //         "/me/picture",
    //         {
    //             "redirect": false,
    //             "height": "150",
    //             "type": "normal",
    //             "width": "150"
    //         },
    //         function (response) {
    //           if (response && !response.error) {
    //               that.setPhoto(response.data.url);
    //           }
    //           else{
    //               console.log(response.error)
    //           }
    //         }
    //     );
    // }

    // updateFbPhoto (){
    //     const { t } = this.props;
    //     var that = this
    //     window.FB.api(
    //         "/me/picture",
    //         {
    //             "redirect": false,
    //             "height": "150",
    //             "type": "normal",
    //             "width": "150"
    //         },
    //         function (response) {
    //           if (response && !response.error) {
    //                 that.setPhoto(response.data.url);
    //           }
    //           else{
    //               console.log(response.error)
    //           }
    //         }
    //     );
    // }

    // fbCheckLogin(){
    //     var that = this
    //     window.FB.getLoginStatus(function(response) {
    //         that.setState({fbStatus: response.status})
    //     });
    // }

    // authFbLogin(){
    //     var that = this
    //     window.FB.login(function(response) {
    //           that.setState({fbStatus: response.status})
    //       }, {scope: 'public_profile'});
    // }

    // loadFbApi(){
    //     window.fbAsyncInit = function() {
    //         window.FB.init({
    //           appId: "1984023341904164",
    //           cookie: true,
    //           status: true,
    //           xfbml: true,
    //           version: "v3.2"
    //         });
    //       };
    //       (function(d, s, id) {
    //         var js, fjs=d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) {return;}
    //         js=d.createElement(s); js.id=id;
    //         js.src="//connect.facebook.net/en_US/sdk.js";
    //         fjs.parentNode.insertBefore(js, fjs);
    //       }(document, "script", "facebook-jssdk"));
    // }

render(){
    const { t } = this.props;
    const { classes } = this.props;
    const { email } = this.state;
    // if(!this.state.fbStatus){
    //     this.fbCheckLogin();
    // }
    if(this.state.status){
    return(
    <div>
        <Grid container justify="center" alignItems="center">
            <Avatar alt="Profile Picture" src={this.props.loginData.photo ? this.props.loginData.photo : Pp} className={classes.Avatar} />
        </Grid>

    {i18next.language === "EN" ?
    //  ENGLISH ALIGN
    <div>
       <h1 style={{color: "black"}}>
        <span style={{color: "#3F51B5"}}>
        {t('welcome')}
        </span>, {this.props.loginData.userName}</h1>
            <ListItem>
                <ListItemIcon>{<Person />}</ListItemIcon>
                <ListItemText primary={<h4>{t('accStatus')}: <span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : this.state.status === "pending" ? "#3F51B5" : "red", fontWeight: "bold"}} >
                {this.state.status === "pending" ? 
                t('accountPendingStatus')
                : this.state.status === "active" ?
                t('accountActiveStatus')
                : this.state.status === "banned" ?
                t('accountBannedStatus')
                : undefined}
                </span>
                </h4>} 
                />
                {this.state.status === "pending" ?
                    <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="accActivate"
                        label={t('actKeyLabel')}
                        type="number"
                        className={classes.textField}
                        helperText={<h6>{t('actKeyInfo', {email})}</h6>}
                        margin="normal"
                        onChange={e => this.setState({actKey: e.target.value})}
                    />
                    <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.validatePendingUser()}} className={classes.fab}>
                        <NextIcon className={classes.extendedIcon2} />
                        <h5>{t('actButtonLabel')}</h5>
                    </Fab>
                </form>:undefined}
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>{<Mood />}</ListItemIcon>
                <ListItemText primary={<h4>{t('health')}: {this.healthBar(this.state.health)}</h4>} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>{<Email />}</ListItemIcon>
                <ListItemText primary={<h4>{t('email')}: {this.state.email}</h4>} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>{<StayPrimaryPortrait />}</ListItemIcon>
                <ListItemText primary={<h4>{t('phone')}: {this.state.phone}</h4>} />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemIcon>{<Whatshot />}</ListItemIcon>
                <ListItemText primary={<h4>{t('ggPoints')}: {this.state.vouchPoints}</h4>} />
            </ListItem>
        </div>
    :
    // ARABIC ALIGN
    <div>
    <h1 style={{color: "black", textAlign: "right"}}>
     <span style={{color: "#3F51B5"}}>
     {t('welcome')}
     </span>, {this.props.loginData.userName}</h1>
         <ListItem>
         {this.state.status === "pending" ?
                 <form className={classes.container} noValidate autoComplete="off">
                 <TextField
                     id="accActivate"
                     label={t('actKeyLabel')}
                     type="number"
                     className={classes.textField}
                     helperText={<h6>{t('actKeyInfo', {email})}</h6>}
                     margin="normal"
                     onChange={e => this.setState({actKey: e.target.value})}
                 />
                 <Fab color="primary" variant="extended" aria-label="accActivate" onClick={()=>{this.validatePendingUser()}} className={classes.fab}>
                     <NextIcon className={classes.extendedIcon2} />
                     <h5>{t('actButtonLabel')}</h5>
                 </Fab>
             </form>:undefined}
            <ListItemText style={{textAlign: "right"}} primary={<h4>{t('accStatus')}: 
                <span style={{fontFamily: "arial", color: this.state.status === "active" ? "Lime" : this.state.status === "pending" ? "#3F51B5" : "red", fontWeight: "bold"}} >
                    {this.state.status === "pending" ? 
                    t('accountPendingStatus')
                    : this.state.status === "active" ?
                    t('accountActiveStatus')
                    : this.state.status === "banned" ?
                    t('accountBannedStatus')
                    : undefined}
                </span>
             </h4>} />

             <ListItemIcon>{<Person />}</ListItemIcon>
         </ListItem>
         <Divider />
         <ListItem>
            <ListItemText style={{textAlign: "right"}} primary={<h4>{this.healthBar(this.state.health)} :{t('health')}</h4>} />
             <ListItemIcon>{<Mood />}</ListItemIcon>
         </ListItem>
         <Divider />
         <ListItem>
             <ListItemText style={{textAlign: "right"}} primary={<h4>{this.state.email} :{t('email')}</h4>} />
             <ListItemIcon>{<Email />}</ListItemIcon>
         </ListItem>
         <Divider />
         <ListItem>
             <ListItemText style={{textAlign: "right"}} primary={<h4> {this.state.phone} :{t('phone')}</h4>} />
             <ListItemIcon>{<StayPrimaryPortrait />}</ListItemIcon>
         </ListItem>
         <Divider />
         <ListItem>
             <ListItemText style={{textAlign: "right"}} primary={<h4> {this.state.vouchPoints} :{t('ggPoints')}</h4>} />
             <ListItemIcon>{<Whatshot />}</ListItemIcon>
         </ListItem>
     </div>
    }
    </div>

    )
}
else {
    return(
        <Loader color={'black'}/>
)
}
}


}

function mapStateToProps(state){
return {
    loginData: state.loginSession,
    server: state.server,
}
}

export default compose(
    withStyles(styles),
    withNamespaces(),
    connect(mapStateToProps),
)(UserProfile);