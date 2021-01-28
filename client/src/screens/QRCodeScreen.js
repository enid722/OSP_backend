import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';

import { detailsSurvey } from '../actions/surveyActions';

import QRCode from 'qrcode.react';

function QRCodeScreen (props){


    const surveyDetails = useSelector(state => state.surveyDetails);
    const {survey, loading, error} = surveyDetails;

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(detailsSurvey(props.match.params.id))
  },[])


    return loading? <div>Loading...</div>:
    error?<div>{error}</div>:<Grid container direction="column" justify="space-around" alignItems="center" >
          <Grid item >
            <QRCode size={400} includeMargin={true} value={"http://localhost:5000/" + survey.token} />
                </Grid>
                <Grid item>
              <h1>{survey.title}</h1>
                </Grid>
          <Grid item>
              <h1>{survey.token}</h1>
                </Grid>

    </Grid>

}

export default QRCodeScreen;