import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../../utils/state';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Popover,
  Tooltip,
  TextField,
  Snackbar,
  InputBase,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BackHandIcon from '@mui/icons-material/BackHand';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

const COLUMN_TYPES = [
  { key: 'todo', label: 'To-Do', filter: (item) => !item.checked && !item.held },
  { key: 'held', label: 'Held', filter: (item) => item.held },
  { key: 'checked', label: 'Checked', filter: (item) => item.checked },
];

const BoardKanban = () => {
  const theme = useTheme();
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState('');
  const [draggedId, setDraggedId] = useState(null);
  const popoverRef = useRef(null);

  // Filtered items by search
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );

  // Column data
  const columns = COLUMN_TYPES.map((col) => ({
    ...col,
    items: filteredItems.filter(col.filter),
  }));

  // Drag handlers
  const handleDragStart = (id) => setDraggedId(id);
  const handleDrop = (colKey) => {
    if (!draggedId) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== draggedId) return item;
        if (colKey === 'todo') return { ...item, held: false, checked: false };
        if (colKey === 'held') return { ...item, held: true, checked: false };
        if (colKey === 'checked') return { ...item, checked: true, held: false };
        return item;
      })
    );
    setDraggedId(null);
  };

  // Popover handlers
  const handleClickPopover = (event, item) => {
    setEditingId(item.id);
    setEditedTitle(item.title);
    setEditedContent(item.content);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
    setEditingId(null);
  };

  // Actions
  const handleEdit = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, title: editedTitle, content: editedContent } : item
      )
    );
    setSnackbar({ open: true, message: 'Task edited', severity: 'success' });
    handleClosePopover();
  };
  const handleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: true, held: false } : item))
    );
    setSnackbar({ open: true, message: 'Task checked', severity: 'success' });
    handleClosePopover();
  };
  const handleHold = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, held: true, checked: false } : item))
    );
    setSnackbar({ open: true, message: 'Task held', severity: 'info' });
    handleClosePopover();
  };
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSnackbar({ open: true, message: 'Task deleted', severity: 'error' });
    handleClosePopover();
  };

  // Snackbar close
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  // Responsive styles
  const columnStyle = {
    flex: 1,
    minWidth: 280,
    maxWidth: 400,
    margin: theme.spacing(1),
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 1),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  };
  const cardStyle = {
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[1],
    cursor: 'grab',
    background: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    transition: 'box-shadow 0.2s',
    '&:hover': { boxShadow: theme.shadows[4] },
  };

  return (
    <Box sx={{ width: '100%', minHeight: '80vh', p: { xs: 1, md: 2 } }}>
      {/* Search Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <SearchIcon color="action" />
        <InputBase
          placeholder="Filter tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, background: theme.palette.action.hover, borderRadius: 2, px: 2, py: 0.5 }}
        />
      </Box>
      {/* Kanban Columns */}
      <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {columns.map((col) => (
          <Grid item xs={12} sm={6} md={4} key={col.key}>
            <Box
              sx={columnStyle}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.key)}
            >
              <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 700 }}>
                {col.label}
              </Typography>
              {col.items.map((item) => (
                <Card
                  key={item.id}
                  sx={cardStyle}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.content}
                        </Typography>
                      </Box>
                      <Tooltip title="More actions" arrow>
                        <IconButton onClick={(e) => handleClickPopover(e, item)}>
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Popover for Task Actions */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, minWidth: 220 }}>
          <TextField
            label="Title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            size="small"
            fullWidth
            multiline
            minRows={2}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
            <Tooltip title="Edit" arrow>
              <IconButton onClick={handleEdit} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Check" arrow>
              <IconButton onClick={() => handleCheck(editingId)} color="success">
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Hold" arrow>
              <IconButton onClick={() => handleHold(editingId)} color="warning">
                <BackHandIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton onClick={() => handleDelete(editingId)} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Popover>
      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default BoardKanban;
