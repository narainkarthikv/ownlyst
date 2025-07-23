import React, {
  useState,
  useTransition,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import NoteCard from '../components/Note/NoteCard';
import CommonSnackbar from '../components/common/CommonSnackbar';
import FilterBar from '../components/common/FilterBar';
import FilterBarSection from '../components/common/FilterBarSection';
import WorkspaceSelector from '../components/common/WorkspaceSelector';
import ThemeToggle from '../components/common/ThemeToggle';
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Fab,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Tooltip,
  alpha,
} from '@mui/material';
import { Add, Search, ViewList, ViewModule } from '@mui/icons-material';
import { filterItems, multiCriteriaSort } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import { noteListStyles, scrollBoxStyles } from '../styles/noteListStyles';
import AddButton from '../components/common/AddButton';
import { debounce } from '../utils/debounce';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@mui/material/styles';

const NoteList = (props) => {
  const theme = useTheme();
  const [items, setItems] = useRecoilState(itemsState);
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(null);
  const [sort, setSort] = useState('az');
  const [workspace, setWorkspace] = useState('default');
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPending, startTransition] = useTransition();
  const dragTimeoutRef = useRef(null);

  // Enhanced search state
  const [searchValue, setSearchValue] = useState('');

  // Sorting state with localStorage persistence
  const [checkedSort, setCheckedSort] = useState(() => {
    try {
      return localStorage.getItem('noteList_checkedSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [heldSort, setHeldSort] = useState(() => {
    try {
      return localStorage.getItem('noteList_heldSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [titleSort, setTitleSort] = useState(() => {
    try {
      return localStorage.getItem('noteList_titleSort') || null;
    } catch (error) {
      return null;
    }
  });

  // Density state with localStorage persistence
  const [isCompact, setIsCompact] = useState(() => {
    try {
      return localStorage.getItem('noteList_isCompact') === 'true';
    } catch (error) {
      return false;
    }
  });

  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
  } = useItemUtils({ ...props, type: 'Note' });

  // Cleanup effect for all event listeners and timeouts
  useEffect(() => {
    return () => {
      setDraggingIndex(null);
      setAnchorEl(null);
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, []);

  const handleDragStart = useCallback((index) => {
    setDraggingIndex(index);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const debouncedSetItems = useCallback(
    debounce((updatedItems) => {
      startTransition(() => setItems(updatedItems));
    }, 100),
    [setItems]
  );

  const handleDrop = useCallback(
    (index, event) => {
      event.preventDefault();
      if (draggingIndex !== null && draggingIndex !== index) {
        const updatedItems = [...items];
        const [draggedItem] = updatedItems.splice(draggingIndex, 1);
        updatedItems.splice(index, 0, draggedItem);
        debouncedSetItems(updatedItems);
      }
      setDraggingIndex(null);
    },
    [draggingIndex, items, debouncedSetItems]
  );

  const handleSave = useCallback(
    (item, id, newTitle, newContent) => {
      setIsEditing(false);
      const updatedItems = items.map((item) =>
        item.id === id
          ? {
              ...item,
              title: newTitle || item.title,
              content: newContent || item.content,
              startDate: item.startDate,
              dueDate: item.dueDate,
            }
          : item
      );
      startTransition(() => setItems(updatedItems));
    },
    [items, setItems, setIsEditing]
  );

  const handleClickPopover = useCallback((event, id) => {
    setEditingId(id);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const addNote = useCallback(() => {
    const newNote = {
      title: 'New Note',
      content: '',
      startDate: null,
      dueDate: null,
      checked: false,
      held: false,
      id: uuidv4(),
    };
    startTransition(() => setItems((prev) => [...prev, newNote]));
  }, [setItems]);

  // Persistence effects
  useEffect(() => {
    try {
      if (checkedSort) {
        localStorage.setItem('noteList_checkedSort', checkedSort);
      } else {
        localStorage.removeItem('noteList_checkedSort');
      }
    } catch (error) {
      console.warn('Failed to save checkedSort to localStorage:', error);
    }
  }, [checkedSort]);

  useEffect(() => {
    try {
      if (heldSort) {
        localStorage.setItem('noteList_heldSort', heldSort);
      } else {
        localStorage.removeItem('noteList_heldSort');
      }
    } catch (error) {
      console.warn('Failed to save heldSort to localStorage:', error);
    }
  }, [heldSort]);

  useEffect(() => {
    try {
      if (titleSort) {
        localStorage.setItem('noteList_titleSort', titleSort);
      } else {
        localStorage.removeItem('noteList_titleSort');
      }
    } catch (error) {
      console.warn('Failed to save titleSort to localStorage:', error);
    }
  }, [titleSort]);

  useEffect(() => {
    try {
      localStorage.setItem('noteList_isCompact', isCompact.toString());
    } catch (error) {
      console.warn('Failed to save isCompact to localStorage:', error);
    }
  }, [isCompact]);

  // Apply filtering and sorting with pinned notes at the top (no separate row)
  const processedItems = React.useMemo(() => {
    let result = filterItems(items, searchValue || filter);
    // Status filter
    if (status === 'checked') result = result.filter(i => i.checked);
    if (status === 'held') result = result.filter(i => i.held);
    if (status === 'unchecked') result = result.filter(i => !i.checked && !i.held);
    // Date filter (if date is set, filter by dueDate or startDate)
    if (date) {
      const d = new Date(date).toDateString();
      result = result.filter(i => (i.dueDate && new Date(i.dueDate).toDateString() === d) || (i.startDate && new Date(i.startDate).toDateString() === d));
    }
    // Sort
    if (sort === 'az') result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'za') result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    if (sort === 'date') result = [...result].sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));
    // Pinned to top
    result = result.slice().sort((a, b) => {
      if (a.pinned === b.pinned) return 0;
      return a.pinned ? -1 : 1;
    });
    return result;
  }, [items, filter, searchValue, status, date, sort]);

  // Sorting handlers
  const handleClearAllSorts = () => {
    setCheckedSort(null);
    setHeldSort(null);
    setTitleSort(null);
  };

  // Density toggle handler
  const handleDensityToggle = () => {
    setIsCompact((prev) => !prev);
  };

  // Enhanced search handler
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
  };

  // Pin toggle handler (robust, by id)
  const handlePinToggle = useCallback((id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, pinned: !item.pinned } : item
    );
    setItems(updatedItems);
  }, [items, setItems]);


  return (
    <>
      {/* Main Content (below navbar) */}
      <Box />
      <Container>
        <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

        {/* New FilterBar: horizontal, card-style, responsive */}
        <FilterBarSection
          status={status}
          setStatus={setStatus}
          search={searchValue}
          setSearch={setSearchValue}
          date={date}
          setDate={setDate}
          sort={sort}
          setSort={setSort}
        />

        {/* All Notes Section */}
        <Box>
          <Grid
            container
            spacing={{
              xs: isCompact ? 1 : 1.5,
              sm: isCompact ? 1.5 : 2,
              md: isCompact ? 2 : 3,
            }}>
            {processedItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
                <NoteCard
                  item={item}
                  index={index}
                  id={item.id}
                  isEditing={isEditing}
                  editingId={editingId}
                  editedTitle={editedTitle}
                  setEditedTitle={setEditedTitle}
                  editedContent={editedContent}
                  setEditedContent={setEditedContent}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  handleClickPopover={handleClickPopover}
                  handleClosePopover={handleClosePopover}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  handleDragOver={handleDragOver}
                  setItems={setItems}
                  setSnackbar={setSnackbar}
                  items={items}
                  isCompact={isCompact}
                  handlePinToggle={handlePinToggle} // Pass pin handler
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Floating Action Button */}
        <Fab
          color='primary'
          aria-label='add note'
          onClick={addNote}
          size={isCompact ? 'medium' : 'large'}
          sx={{
            position: 'fixed',
            bottom: {
              xs: 16,
              sm: 20,
              md: 24,
              lg: 32,
            },
            right: {
              xs: 16,
              sm: 20,
              md: 24,
              lg: 32,
            },
            zIndex: theme.zIndex.fab,
            boxShadow: isCompact
              ? '0 2px 8px rgba(0,0,0,0.15)'
              : '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: isCompact
                ? '0 4px 12px rgba(0,0,0,0.2)'
                : '0 6px 16px rgba(0,0,0,0.2)',
            },
            transition: 'all 0.2s ease-in-out',
            // Touch device optimizations
            '@media (hover: none)': {
              '&:hover': {
                transform: 'none',
                boxShadow: isCompact
                  ? '0 2px 8px rgba(0,0,0,0.15)'
                  : '0 4px 12px rgba(0,0,0,0.15)',
              },
            },
          }}>
          <Add />
        </Fab>
      </Container>
    </>
  );
};

export default NoteList;
