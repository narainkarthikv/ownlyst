import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

export default function ThemeToggle({ onToggle }) {
  return (
    <Tooltip title="Toggle theme">
      <IconButton color="inherit" onClick={onToggle} size="large">
        <PaletteIcon />
      </IconButton>
    </Tooltip>
  );
}
