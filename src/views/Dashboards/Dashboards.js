// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, makeStyles, Tab, Tabs } from '@material-ui/core';
import { DASHBOARDS_LIST_CONFIG } from '../../config/PowerBI';

import { useTranslation } from 'react-i18next';
import { DashboardsPowerBiReport } from './components';

const useStyles = makeStyles((theme) => ({
  dashboardsRoot: {
    height: '100%',
    margin: 'auto',
    width: '100%',
  },
  tabs: {
    width: '100%',
    maxWidth: '900px',
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiButtonBase-root': {
      maxWidth: '900px',
    },
    '& .MuiTab-wrapper': {
      textAlign: 'right',
      alignItems: 'flex-end',
    },
  },
  dashboardsTabsContainer: {
    height: '100%',
  },
  dashboardsMainContainer: {
    height: '100%',
  },
  dashboardsTabCard: {
    height: '100%',
  },
  dashboard: {
    overflow: 'auto',
    height: '100%',
  },
}));

const DEFAULT_MISSING_TITLE = 'MISSING_TITLE_IN_LANGUAGE';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Dashboards = () => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dashboardTitle =
    DASHBOARDS_LIST_CONFIG[value].title[i18n.language] === undefined
      ? DEFAULT_MISSING_TITLE
      : DASHBOARDS_LIST_CONFIG[value].title[i18n.language];

  return (
    <Grid container className={classes.dashboardsRoot} direction="row">
      <Grid item sm={2} className={classes.dashboardsTabsContainer}>
        <Card className={classes.dashboardsTabCard}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Dashboards list"
            className={classes.tabs}
          >
            {constructDashboardTabs(i18n)}
          </Tabs>
        </Card>
      </Grid>
      <Grid item sm={10} className={classes.dashboardsMainContainer}>
        <Card className={classes.dashboard}>
          <CardContent>{<TabPanel index={value} key={dashboardTitle} title={dashboardTitle} />}</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

function TabPanel(props) {
  const { children, index, title, ...other } = props;

  return (
    <div role="tabpanel" id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      <DashboardsPowerBiReport index={index} />
    </div>
  );
}

const constructDashboardTabs = (i18n) => {
  const tabs = [];
  for (const dashboardConf of DASHBOARDS_LIST_CONFIG) {
    const dashboardTitle =
      dashboardConf.title[i18n.language] === undefined ? DEFAULT_MISSING_TITLE : dashboardConf.title[i18n.language];
    tabs.push(<Tab key={dashboardTitle} label={dashboardTitle} {...a11yProps(dashboardConf.id)} />);
  }
  return tabs;
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default Dashboards;
