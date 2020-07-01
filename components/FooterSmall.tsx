import React from 'react'
import Box from '@material-ui/core/Box'
import Copyright from './Copyright'

const FooterSmall = ({mt=8}) => (
  <>
    <Box mt={mt}>
      <Copyright />
    </Box>
  </>
)
export default FooterSmall
