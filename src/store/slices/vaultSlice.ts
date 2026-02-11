import { VaultState } from '@/types/passwordVaultTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: VaultState = {
  prkPackage: null,
};

const vaultSlice = createSlice({
  name: 'vault',
  initialState,
  reducers: {
    setPrkPackage: (state, action) => {
      state.prkPackage = action.payload;
    },
    clearVault: (state) => {
      state.prkPackage = null;
    },
  },
});

export const { setPrkPackage, clearVault } = vaultSlice.actions;
export default vaultSlice.reducer;
