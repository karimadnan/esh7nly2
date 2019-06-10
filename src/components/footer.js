import React, { Component } from 'react';
import ReactRouter from 'flux-react-router';
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
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    descStyle: {
        margin: theme.spacing.unit,
        fontSize: 12,
        [theme.breakpoints.up('sm')]: {
          fontSize: 17,
          fontWeight: 'bold'
        }
    },
    chip: {
        margin: theme.spacing.unit,
        fontSize: 10,
        [theme.breakpoints.up('sm')]: {
          fontSize: 16,
        }
    },
    fbIcon: {
        width: 50,
        height: 50,
        fontSize: 35,
        color: '#212121',
        fontWeight: 'bold',
        backgroundColor: '#4e4e4e',
        transition: "0.5s cubic-bezier(.47,1.64,.41,.8)",
        '&:hover': {
            backgroundColor: '#3F51B5',
          },
      },
      igIcon: {
        width: 50,
        height: 50,
        fontSize: 35,
        color: '#212121',
        fontWeight: 'bold',
        backgroundColor: '#4e4e4e',
        transition: "0.5s cubic-bezier(.47,1.64,.41,.8)",
        '&:hover': {
            background: "#f09433",
            background: "-moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            background: "-webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            background: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 )"
          },
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
      footer: {
        borderTop: '1px solid #333',
        marginTop: 'auto',
        color: '#fff',
        backgroundColor: '#212121',
      },
      bottom: {
          marginTop: theme.spacing.unit * 20
      }
});


class Footer extends Component {

render() {
    const { classes } = this.props;
    const { t } = this.props;
    return (

    <footer className={classes.footer}>
        <div className="container">
        {i18next.language === "EN" ?
            <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="col-xs-12 col-md-4 col-lg-4">
                    <h3 style={{fontWeight: 'bold'}}>{t('footerText1')}</h3>
                    <h4>{t('footerText2')}</h4>
                </div>
                <div className="col-xs-6 col-md-1 col-lg-1">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{                    
                            <Avatar className={classes.fbIcon}>
                                f
                            </Avatar>}
                        </ListItemIcon>
                    </ListItem>
                </div>
                <div className="col-xs-6 col-md-1 col-lg-1">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{                    
                            <Avatar className={classes.igIcon}>
                                <span className="svg-icon svg-icon-insta"/>
                            </Avatar>}
                        </ListItemIcon>
                    </ListItem>
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

                <div className={classes.bottom}>
                    <div className="col-md-3 col-lg-3 col-xs-4">
                        <Grid container justify="flex-start" alignItems="center">
                            <h6 style={{fontWeight: "bold"}}> © 2019 ggegypt </h6>
                        </Grid>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xs-4 ">
                        <Grid container justify="flex-end" alignItems="center">
                            <Chip
                                onClick={()=>{ReactRouter.goTo("/privacy")}}
                                label={t('privacyPolicy')}
                                className={classes.chip}
                                variant="outlined"
                                color="primary"
                            />
                        </Grid>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xs-4 ">
                        <Grid container justify="flex-start" alignItems="center">
                            <Chip
                                onClick={()=>{ReactRouter.goTo("/contactus")}}
                                label={t('contact')}
                                className={classes.chip}
                                variant="outlined"
                                color="primary"
                            />
                        </Grid>
                    </div>
                </div>
            </div>
            : i18next.language !== "EN" && !isMobile ?
            <div className="col-xs-12 col-md-12 col-lg-12">
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

                <div className="col-xs-6 col-md-1 col-lg-1">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{                    
                            <Avatar className={classes.igIcon}>
                                <span className="svg-icon svg-icon-insta"/>
                            </Avatar>}
                        </ListItemIcon>
                    </ListItem>
                </div>
                <div className="col-xs-6 col-md-1 col-lg-1">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{                    
                            <Avatar className={classes.fbIcon}>
                                f
                            </Avatar>}
                        </ListItemIcon>
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

            <div className={classes.bottom}>
                <div className="col-md-3 col-lg-3 col-xs-5">
                    <Grid container justify="flex-start" alignItems="center">
                        <h6 style={{fontWeight: "bold"}}> © 2019 ggegypt </h6>
                    </Grid>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-4 ">
                    <Grid container justify="flex-end" alignItems="center">
                        <Chip
                            onClick={()=>{ReactRouter.goTo("/privacy")}}
                            label={t('privacyPolicy')}
                            className={classes.chip}
                            variant="outlined"
                            color="primary"
                        />
                    </Grid>
                </div>
                <div className="col-md-3 col-lg-3 col-xs-3 ">
                    <Grid container justify="flex-start" alignItems="center">
                        <Chip
                            onClick={()=>{ReactRouter.goTo("/contactus")}}
                            label={t('contact')}
                            className={classes.chip}
                            variant="outlined"
                            color="primary"
                        />
                    </Grid>
            </div>
        </div>
    </div>


            : i18next.language !== "EN" && isMobile ?
                <div className="col-xs-12 col-md-12 col-lg-12">
                <div className="col-xs-12 col-md-3 col-lg-3">
                    <Grid container justify="flex-end" alignItems="center">
                        <h3 style={{fontWeight: 'bold'}}>{t('footerText1')}</h3>
                    </Grid>
                    <Grid container justify="flex-end" alignItems="center">
                        <h4>{t('footerText2')}</h4>
                    </Grid>
                </div>
                <div className="col-xs-6 col-md-1 col-lg-1">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{                    
                            <Avatar className={classes.igIcon}>
                                <span className="svg-icon svg-icon-insta"/>
                            </Avatar>}
                        </ListItemIcon>
                    </ListItem>
                </div>
                <div className="col-xs-6 col-md-1 col-lg-1">
                    <ListItem className={classes.descStyle}>
                        <ListItemIcon>{                    
                            <Avatar className={classes.fbIcon}>
                                f
                            </Avatar>}
                        </ListItemIcon>
                    </ListItem>
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
                <div className={classes.bottom}>
                    <div className="col-md-3 col-lg-3 col-xs-5">
                        <Grid container justify="flex-start" alignItems="center">
                            <h6 style={{fontWeight: "bold"}}> © 2019 ggegypt </h6>
                        </Grid>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xs-4 ">
                        <Grid container justify="flex-end" alignItems="center">
                            <Chip
                                onClick={()=>{ReactRouter.goTo("/privacy")}}
                                label={t('privacyPolicy')}
                                className={classes.chip}
                                variant="outlined"
                                color="primary"
                            />
                        </Grid>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xs-3 ">
                        <Grid container justify="flex-start" alignItems="center">
                            <Chip
                                onClick={()=>{ReactRouter.goTo("/contactus")}}
                                label={t('contact')}
                                className={classes.chip}
                                variant="outlined"
                                color="primary"
                            />
                        </Grid>
                    </div>
                </div>
                </div>: undefined}
            </div>
    </footer>
    );
    }
}

export default withStyles(styles)(withNamespaces()(Footer));