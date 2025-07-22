import React, {
  useState,
  useTransition,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import TableCard from '../components/Table/TableCard';
import CommonSnackbar from '../components/common/CommonSnackbar';
import FilterBar from '../components/common/FilterBar';
import WorkspaceSelector from '../components/common/WorkspaceSelector';
import ThemeToggle from '../components/common/ThemeToggle';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from '@mui/material';
import { filterItems, multiCriteriaSort } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import {
  tableListStyles,
  tableStyles,
  tableHeadStyles,
  tableCellStyles,
  boxStyles,
  scrollBoxStyles,
} from '../styles/tableListStyles';
import AddButton from '../components/common/AddButton';
import { debounce } from '../utils/debounce';
import { v4 as uuidv4 } from 'uuid';

const TableList = (props) => {
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

  // Sorting state with localStorage persistence
  const [checkedSort, setCheckedSort] = useState(() => {
    try {
      return localStorage.getItem('tableList_checkedSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [heldSort, setHeldSort] = useState(() => {
    try {
      return localStorage.getItem('tableList_heldSort') || null;
    } catch (error) {
      return null;
    }
  });
  const [titleSort, setTitleSort] = useState(() => {
    try {
      return localStorage.getItem('tableList_titleSort') || null;
    } catch (error) {
      return null;
    }
  });

  // Density state with localStorage persistence
  const [isCompact, setIsCompact] = useState(() => {
    try {
      return localStorage.getItem('tableList_isCompact') === 'true';
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
  } = useItemUtils({ ...props, type: 'Row' });

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

  const addRow = useCallback(() => {
    const newRow = {
      title: 'New Row',
      content: '',
      startDate: null,
      dueDate: null,
      checked: false,
      held: false,
      id: uuidv4(),
    };
    startTransition(() => setItems((prev) => [...prev, newRow]));
  }, [setItems]);

  // Persistence effects
  useEffect(() => {
    try {
      if (checkedSort) {
        localStorage.setItem('tableList_checkedSort', checkedSort);
      } else {
        localStorage.removeItem('tableList_checkedSort');
      }
    } catch (error) {
      console.warn('Failed to save checkedSort to localStorage:', error);
    }
  }, [checkedSort]);

  useEffect(() => {
    try {
      if (heldSort) {
        localStorage.setItem('tableList_heldSort', heldSort);
      } else {
        localStorage.removeItem('tableList_heldSort');
      }
    } catch (error) {
      console.warn('Failed to save heldSort to localStorage:', error);
    }
  }, [heldSort]);

  useEffect(() => {
    try {
      if (titleSort) {
        localStorage.setItem('tableList_titleSort', titleSort);
      } else {
        localStorage.removeItem('tableList_titleSort');
      }
    } catch (error) {
      console.warn('Failed to save titleSort to localStorage:', error);
    }
  }, [titleSort]);

  useEffect(() => {
    try {
      localStorage.setItem('tableList_isCompact', isCompact.toString());
    } catch (error) {
      console.warn('Failed to save isCompact to localStorage:', error);
    }
  }, [isCompact]);

  // Apply filtering and sorting with pinned rows at the top
  const processedItems = React.useMemo(() => {
    let result = filterItems(items, filter);
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
  }, [items, filter, status, date, sort]);

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

  // Pin toggle handler (robust, by id)
  const handlePinToggle = useCallback((id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, pinned: !item.pinned } : item
    );
    setItems(updatedItems);
  }, [items, setItems]);

  return (
    <Box sx={boxStyles}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

      {/* New FilterBar: horizontal, card-style, responsive */}
      <Box sx={{ width: '100%', maxWidth: '1400px', mb: 2, mt: 10, mr: 5 }}>
        <FilterBar
          status={status}
          setStatus={setStatus}
          search={filter}
          setSearch={setFilter}
          date={date}
          setDate={setDate}
          sort={sort}
          setSort={setSort}
        />
      </Box>
      <Grid container spacing={isCompact ? 1 : 2} sx={scrollBoxStyles}>
        <Grid item xs={12}>
          <Table sx={tableStyles} size={isCompact ? 'small' : 'medium'}>
            <TableHead sx={tableHeadStyles}>
              <TableRow>
                <TableCell align='center' sx={{ ...tableCellStyles, width: 48 }}>
                  {/* Pin icon header */}
                  <span role="img" aria-label="Pin">📌</span>
                </TableCell>
                <TableCell align='center' sx={tableCellStyles}>
                  Title
                </TableCell>
                <TableCell align='center' sx={tableCellStyles}>
                  Content
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ ...tableCellStyles, minWidth: '200px' }}>
                  Start Date
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ ...tableCellStyles, minWidth: '250px' }}>
                  Due Date
                </TableCell>
                <TableCell align='center' sx={{ ...tableCellStyles, width: 64 }}>
                  {/* Actions header */}
                  <span role="img" aria-label="Actions">⋮</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {processedItems.map((item, index) => (
                <TableCard
                  key={item.id}
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
                  handlePinToggle={handlePinToggle}
                />
              ))}
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  <AddButton onClick={addRow} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableList;
