import React from 'react';
import FilterBar from './FilterBar';
import { Box } from '@mui/material';

/**
 * Standard wrapper for FilterBar with consistent layout and spacing.
 * Use this in all pages that need the FilterBar at the top.
 */
export default function FilterBarSection(props) {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', mb: 2, mt: 10, mr: 5 }}>
      <FilterBar {...props} />
    </Box>
  );
}
