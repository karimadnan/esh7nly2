import React, { Component } from 'react';
import ReactRouter from 'flux-react-router';
import '../Mycss.css';
import '../Respcss.css';
import { FacebookProvider, Page} from 'react-facebook';
import i18next from 'i18next';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {isMobile} from 'react-device-detect';

const styles = theme => ({
    descStyle: {
        margin: theme.spacing.unit,
        fontSize: 12,
        [theme.breakpoints.up('sm')]: {
          fontSize: 17,
          fontWeight: 'bold'
        }
    },
    emailAvatar: {
        width: 50,
        height: 50,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#3F51B5',
      },
      fbAvatar: {
        width: 50,
        height: 50,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#3F51B5',
      },
});


class Footer extends Component {

render() {
    const { classes } = this.props;
    const { t } = this.props;
    return (

    <footer id="page-footer">
        {i18next.language === "EN" ?
        <div className="col-xs-12 col-md-12 col-lg-12">
            <div className="col-xs-12 col-md-3 col-lg-3">
                <h3 style={{fontWeight: 'bold'}}>{t('footerText1')}</h3>
                <h4>{t('footerText2')}</h4>
            </div>
            <div className="col-xs-12 col-md-3 col-lg-3">
                <ListItem className={classes.descStyle}>
                    <ListItemIcon>{<Avatar className={classes.emailAvatar}><EmailIcon /></Avatar>}</ListItemIcon>
                    <ListItemText disableTypography primary={"Contact@ggegypt.com"} />
                </ListItem>
            </div>
            <div className="col-xs-12 col-md-3 col-lg-3">
                <ListItem className={classes.descStyle}>
                    <ListItemIcon>{<Avatar className={classes.emailAvatar}><PhoneIcon /></Avatar>}</ListItemIcon>
                    <ListItemText disableTypography primary={"01146494889"} />
                </ListItem>
            </div>
            <div className="col-md-3 col-lg-3 col-xs-12 ">
                <ListItem className={classes.descStyle}>
                    <ListItemIcon>{<Avatar className={classes.fbAvatar}>F</Avatar>}</ListItemIcon>
                    <ListItemText disableTypography primary={t('likeUsFb')} />
                </ListItem>
                <Grid container justify="flex-end" alignItems="center">
                    <FacebookProvider key="1" appId="1984023341904164">
                        <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
                    </FacebookProvider> 
                </Grid>
            </div>
            <div className="col-md-3 col-lg-3 col-xs-5">
                <Grid container justify="flex-start" alignItems="center">
                    <h6 style={{fontWeight: "bold"}}> © 2019 ggegypt </h6>
                </Grid>
            </div>
            <div className="col-md-3 col-lg-3 col-xs-4 ">
                <Grid container justify="flex-end" alignItems="center">
                    <h6 style={{fontWeight: "bold", cursor: 'pointer'}}> <p onClick={()=>{ReactRouter.goTo("/privacy")}}> {t('privacyPolicy')} </p></h6>
                </Grid>
            </div>
            <div className="col-md-3 col-lg-3 col-xs-3 ">
                <Grid container justify="flex-start" alignItems="center">
                    <h6 style={{fontWeight: "bold", cursor: 'pointer'}}> <p onClick={()=>{ReactRouter.goTo("/contactus")}}> {t('contact')} </p> </h6>
                </Grid>
            </div>
            </div>
            : i18next.language !== "EN" && !isMobile ?
            <div>
            <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="col-md-3 col-lg-3 col-xs-12 ">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{<Avatar className={classes.fbAvatar}>F</Avatar>}</ListItemIcon>
                        <ListItemText disableTypography primary={t('likeUsFb')} />
                    </ListItem>
                    <Grid container justify="flex-end" alignItems="center">
                        <FacebookProvider key="1" appId="1984023341904164">
                            <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
                        </FacebookProvider> 
                    </Grid>
                </div>
                
                <div className="col-xs-12 col-md-3 col-lg-3">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{<Avatar className={classes.emailAvatar}><PhoneIcon /></Avatar>}</ListItemIcon>
                        <ListItemText disableTypography primary={"01146494889"} />
                    </ListItem>
                </div>
                <div className="col-xs-12 col-md-3 col-lg-3">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{<Avatar className={classes.emailAvatar}><EmailIcon /></Avatar>}</ListItemIcon>
                        <ListItemText disableTypography primary={"Contact@ggegypt.com"} />
                    </ListItem>
                </div>
                <div className="col-xs-12 col-md-3 col-lg-3">
                <Grid container justify="flex-end" alignItems="center">
                    <h3 style={{fontWeight: 'bold'}}>{t('footerText1')}</h3>
                </Grid>
                <Grid container justify="flex-end" alignItems="center">
                    <h4>{t('footerText2')}</h4>
                </Grid>

                </div>
            </div>
            <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="col-md-3 col-lg-3 col-xs-5">
                    <Grid container justify="flex-start" alignItems="center">
                        <h6 style={{fontWeight: "bold"}}> © 2019 ggegypt </h6>
                    </Grid>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-4 ">
                    <Grid container justify="flex-end" alignItems="center">
                        <h5 style={{fontWeight: "bold", cursor: 'pointer'}}> <p onClick={()=>{ReactRouter.goTo("/privacy")}}> {t('privacyPolicy')} </p></h5>
                    </Grid>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-3 ">
                    <Grid container justify="flex-start" alignItems="center">
                        <h5 style={{fontWeight: "bold", cursor: 'pointer'}}> <p onClick={()=>{ReactRouter.goTo("/contactus")}}> {t('contact')} </p> </h5>
                    </Grid>
                </div>
            </div>
            </div>
            : i18next.language !== "EN" && isMobile ?
                <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="col-xs-12 col-md-3 col-lg-3">
                    <Grid container justify="center" alignItems="center">
                        <h3 style={{fontWeight: 'bold'}}>{t('footerText1')}</h3>
                    </Grid>
                    <Grid container justify="center" alignItems="center">
                        <h4>{t('footerText2')}</h4>
                    </Grid>
                </div>
                <div className="col-xs-12 col-md-3 col-lg-3">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{<Avatar className={classes.emailAvatar}><EmailIcon /></Avatar>}</ListItemIcon>
                        <ListItemText disableTypography primary={"Contact@ggegypt.com"} />
                    </ListItem>
                </div>
                <div className="col-xs-12 col-md-3 col-lg-3">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{<Avatar className={classes.emailAvatar}><PhoneIcon /></Avatar>}</ListItemIcon>
                        <ListItemText disableTypography primary={"01146494889"} />
                    </ListItem>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-12 ">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{<Avatar className={classes.fbAvatar}>F</Avatar>}</ListItemIcon>
                        <ListItemText disableTypography primary={t('likeUsFb')} />
                    </ListItem>
                    <Grid container justify="flex-end" alignItems="center">
                        <FacebookProvider key="1" appId="1984023341904164">
                            <Page style={{width: 317}}  showFacepile="false" href="https://www.facebook.com/EgyptianObama/" />
                        </FacebookProvider> 
                    </Grid>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-5">
                    <Grid container justify="flex-start" alignItems="center">
                        <h6 style={{fontWeight: "bold"}}> © 2019 ggegypt </h6>
                    </Grid>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-4 ">
                    <Grid container justify="flex-end" alignItems="center">
                        <h6 style={{fontWeight: "bold", cursor: 'pointer'}}> <p onClick={()=>{ReactRouter.goTo("/privacy")}}> {t('privacyPolicy')} </p></h6>
                    </Grid>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-3 ">
                    <Grid container justify="flex-start" alignItems="center">
                        <h6 style={{fontWeight: "bold", cursor: 'pointer'}}> <p onClick={()=>{ReactRouter.goTo("/contactus")}}> {t('contact')} </p> </h6>
                    </Grid>
                </div>
                </div>: undefined}
    </footer>
    );
    }
}

export default withStyles(styles)(withNamespaces()(Footer));