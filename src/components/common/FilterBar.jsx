import React from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, IconButton, Paper, useMediaQuery } from '@mui/material';
// Use native MUI TextField for date input (type='date')
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'checked', label: 'Checked' },
  { value: 'held', label: 'Held' },
  { value: 'unchecked', label: 'Unchecked' },
];

const sortOptions = [
  { value: 'az', label: 'A–Z' },
  { value: 'za', label: 'Z–A' },
  { value: 'date', label: 'Date' },
];

export default function FilterBar({
  status, setStatus, search, setSearch, date, setDate, sort, setSort
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={e => setStatus(e.target.value)}
        >
          {statusOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
        }}
        sx={{ flex: 1, minWidth: 180 }}
      />
      <TextField
        size="small"
        variant="outlined"
        type="date"
        value={date || ''}
        onChange={e => setDate(e.target.value)}
        sx={{ minWidth: 140 }}
        InputLabelProps={{ shrink: true }}
        label="Date"
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sort}
          label="Sort"
          onChange={e => setSort(e.target.value)}
          startAdornment={<SortIcon fontSize="small" sx={{ mr: 1 }} />}
        >
          {sortOptions.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}
