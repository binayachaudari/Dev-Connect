import React, { Fragment } from 'react';
import loadingGIF from '../../assets/images/loading.gif';

export default () => (
  <Fragment>
    <img src={loadingGIF} style={{ margin: '0 auto', width: '500px', display: 'block' }} alt="Loading..." />
  </Fragment>
);
