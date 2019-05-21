import React, { Component } from 'react';
import '../Mycss.css';
import '../Respcss.css';
import Navbar from './navbar';
import Footer from './footer';
import ProductSlider from '../containers/product-slider';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Timer from '@material-ui/icons/Timer';
import { withNamespaces } from 'react-i18next';
import { withStyles, MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import i18next from 'i18next';
import {Helmet} from "react-helmet";

const styles = theme => ({
  extendedIcon2: {
      marginRight: theme.spacing.unit * 6,
  },
  chip: {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 3,
      fontSize: 13,
      [theme.breakpoints.up('sm')]: {
        fontSize: 20
      }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: { 'main': 'rgba(0, 0, 0, 0.5)' } // custom color in hex
  }
});

class Main extends Component {

  state ={
    timeLeft: ''
  }

componentDidMount(){
  this.interval = setInterval(() => this.tick(), 1000)
}

componentWillUnmount() {
    clearInterval(this.interval);
}

tick() {
  const currentDate = moment();
  const future = moment('2019-05-4 11:00:00', ["YYYY-MM-DD HH:mm:ss"]);
  let timeCount = moment(future.diff(currentDate))
  this.setState({timeLeft: timeCount - 1000})
}

render(){
  const days = moment(this.state.timeLeft).format("DD")
  const hours = moment(this.state.timeLeft).format("HH")
  const minutes = moment(this.state.timeLeft).format("mm")

  const { t } = this.props;
  const { classes } = this.props;

  return(
    <div>
      <div className="bg-image">
        <Helmet>
            <title>{t('mainTitle')}</title>
            <meta name="description" content={t('mainTitle')} />
        </Helmet>
        <Navbar page={0}/>
            {i18next.language === "EN" ? 
            <div className="badge-logo"/>:
            <div className="badge-logo-ar"/>}
            <MuiThemeProvider theme={theme}>
            <Grid container justify="center" alignItems="center">
               {this.state.timeLeft > 0 && 
               <Chip
                    icon={<Timer />}
                    label={`${t('openDayDays', {days})}${t('openDayHours', {hours})}${t('openDayMinutes', {minutes})}`}
                    className={classes.chip}
                    color="primary"
                />}
            </Grid>
            </MuiThemeProvider>
             <ProductSlider />
        <Footer />
      </div>

    </div>
  )
}
}

export default withNamespaces()(withStyles(styles)(Main));
