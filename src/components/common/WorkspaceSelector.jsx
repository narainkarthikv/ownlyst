import React from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const workspaces = [
  { value: 'default', label: 'My Workspace' },
  { value: 'team', label: 'Team Workspace' },
  { value: 'archive', label: 'Archive' },
];

export default function WorkspaceSelector({ value, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel>Workspace</InputLabel>
      <Select value={value} label="Workspace" onChange={onChange}>
        {workspaces.map(ws => (
          <MenuItem key={ws.value} value={ws.value}>{ws.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
