import React from 'react';
import ContentWrapper from '../../common/ContentWrapper';
import ContentWrapperBody from '../../common/ContentWrapperBody';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    text: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      color: theme.palette.text.primary,
      fontSize:16
    }
  }))
;

const Info = () => {
  const classes = useStyles();
  return (
    <ContentWrapper>
      <ContentWrapperBody>
        <div className={`${classes.text}`} >
          В данной версии функционал не доступен
        </div>
      </ContentWrapperBody>
    </ContentWrapper>
  )
};

export default Info;