import React, { useState, useTransition, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import BoardCard from '../components/Board/BoardCard';
import CommonSnackbar from '../components/common/CommonSnackbar';
import FilterBarSection from '../components/common/FilterBarSection';
import WorkspaceSelector from '../components/common/WorkspaceSelector';
import ThemeToggle from '../components/common/ThemeToggle';
import { Box, Grid, Typography } from '@mui/material';
import { filterItems, multiCriteriaSort } from '../utils/helper';
import { useItemUtils } from '../utils/useItemUtils';
import {
  boardListStyles,
  scrollBoxStyles,
  gridContainerStyles,
} from '../styles/boardListStyles';
import AddButton from '../components/common/AddButton';

import { useItemListPage } from '../hooks/useItemListPage';

const BoardList = () => {
  const {
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
    draggingIndex,
    setDraggingIndex,
    editingId,
    setEditingId,
    anchorEl,
    setAnchorEl,
    isCompact,
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
    handlePinToggle,
  } = useItemListPage({ type: 'Board' });

  // Filtering, sorting, and pinning logic
  const processedItems = React.useMemo(() => {
    let result = items;
    if (filter) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(filter.toLowerCase()) ||
          item.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (status) {
      result = result.filter((item) => item.status === status);
    }
    if (date) {
      result = result.filter((item) => item.dueDate === date);
    }
    if (sort === 'az') {
      result = result.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'za') {
      result = result.slice().sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === 'date') {
      result = result.slice().sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }
    result = result.slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    return result;
  }, [items, filter, status, date, sort]);

  const addBoard = () => {
    const newBoard = {
      title: 'New Board',
      content: '',
      startDate: null,
      dueDate: null,
      checked: false,
      held: false,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    };
    setItems([...items, newBoard]);
  };

  // Pin toggle handler (robust, by id)
// ...existing code...

  return (
    <Box sx={boardListStyles}>
      <CommonSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />

      {/* New FilterBar: horizontal, card-style, responsive */}
      <FilterBarSection
        status={status}
        setStatus={setStatus}
        search={filter}
        setSearch={setFilter}
        date={date}
        setDate={setDate}
        sort={sort}
        setSort={setSort}
      />

      {/* Scrollable Content Area */}
      <Box sx={scrollBoxStyles}>
        <Grid container spacing={isCompact ? 1 : 2} sx={gridContainerStyles}>
          {processedItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <BoardCard
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
                isCompact={isCompact}
                handlePinToggle={handlePinToggle}
              />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
            <AddButton onClick={addBoard} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BoardList;
