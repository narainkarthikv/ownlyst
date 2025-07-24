import React, { useState, useTransition, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { itemsState, snackbarState } from '../utils/state';
import BoardKanban from '../components/Board/BoardKanban';
import { Box } from '@mui/material';
import { useItemListPage } from '../hooks/useItemListPage';

const BoardList = () => {
  // Use the same hook for state, but BoardKanban manages its own filtering, drag, actions, etc.
  const {
    items,
    setItems,
    snackbar,
    setSnackbar,
  } = useItemListPage({ type: 'Board' });

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <BoardKanban
        items={items}
        setItems={setItems}
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
    </Box>
  );
};

export default BoardList;
