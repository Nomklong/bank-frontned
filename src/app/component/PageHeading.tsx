import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

type PageHeadingType = {
  mb?: number;
  title?: string;
};

const PageHeading = (props: PageHeadingType): JSX.Element => {
  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      mb={props.mb}
      py={3}
    >
      <Typography variant="h5">{props.title}</Typography>
    </Box>
  );
};

PageHeading.defaultProps = {
  mb: 0,
  title: '',
};

export default PageHeading;
