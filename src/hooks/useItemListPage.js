import { useState, useCallback, useRef, useTransition, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import { debounce } from '../utils/debounce';
import { useItemUtils } from '../utils/useItemUtils';

/**
 * Shared logic for BoardList, NoteList, TableList pages.
 * @param {object} options
 * @param {string} options.type - 'Board' | 'Note' | 'Row'
 * @returns {object} Shared state and handlers
 */
export function useItemListPage({ type }) {
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

  // Enhanced search state (for NoteList)
  const [searchValue, setSearchValue] = useState('');

  // Sorting state with localStorage persistence
  const [checkedSort, setCheckedSort] = useState(() => {
    return localStorage.getItem(`${type}-checkedSort`) || null;
  });
  const [heldSort, setHeldSort] = useState(() => {
    return localStorage.getItem(`${type}-heldSort`) || null;
  });
  const [titleSort, setTitleSort] = useState(() => {
    return localStorage.getItem(`${type}-titleSort`) || null;
  });

  // Density state with localStorage persistence
  const [isCompact, setIsCompact] = useState(() => {
    return localStorage.getItem(`${type}-isCompact`) === 'true';
  });

  const {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
  } = useItemUtils({ type });

  // Cleanup effect for all event listeners and timeouts
  useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
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
      setItems(updatedItems);
    }, 100),
    [setItems]
  );

  const handleDrop = useCallback(
    (index, event) => {
      event.preventDefault();
      if (draggingIndex === null || draggingIndex === index) return;
      const updated = [...items];
      const [removed] = updated.splice(draggingIndex, 1);
      updated.splice(index, 0, removed);
      debouncedSetItems(updated);
      setDraggingIndex(null);
    },
    [draggingIndex, items, debouncedSetItems]
  );

  const handleSave = useCallback(
    (item, id, newTitle, newContent) => {
      const updated = items.map((it) =>
        it.id === id ? { ...it, title: newTitle, content: newContent } : it
      );
      setItems(updated);
      setIsEditing(false);
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

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(`${type}-checkedSort`, checkedSort || '');
  }, [checkedSort, type]);
  useEffect(() => {
    localStorage.setItem(`${type}-heldSort`, heldSort || '');
  }, [heldSort, type]);
  useEffect(() => {
    localStorage.setItem(`${type}-titleSort`, titleSort || '');
  }, [titleSort, type]);
  useEffect(() => {
    localStorage.setItem(`${type}-isCompact`, isCompact);
  }, [isCompact, type]);

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

  // Enhanced search handler (for NoteList)
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  const handleSearchClear = () => {
    setSearchValue('');
  };

  // Pin toggle handler (robust, by id)
  const handlePinToggle = useCallback(
    (id) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, pinned: !item.pinned } : item
        )
      );
    },
    [setItems]
  );

  return {
    items,
    setItems,
    snackbar,
    setSnackbar,
    filter,
    setFilter,
    status,
    setStatus,
    date,
    setDate,
    sort,
    setSort,
    workspace,
    setWorkspace,
    draggingIndex,
    setDraggingIndex,
    editingId,
    setEditingId,
    anchorEl,
    setAnchorEl,
    isPending,
    startTransition,
    dragTimeoutRef,
    searchValue,
    setSearchValue,
    checkedSort,
    setCheckedSort,
    heldSort,
    setHeldSort,
    titleSort,
    setTitleSort,
    isCompact,
    setIsCompact,
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedContent,
    setEditedContent,
    handleEdit,
    handleSave,
    handleClickPopover,
    handleClosePopover,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleClearAllSorts,
    handleDensityToggle,
    handleSearchChange,
    handleSearchClear,
    handlePinToggle,
    type,
  };
}
