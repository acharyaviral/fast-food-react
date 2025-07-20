import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

interface Position {
  latitude: number;
  longitude: number;
}

interface FetchAddressResponse {
  position: Position;
  address: string;
}

interface UserState {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: Position | Record<string, never>; // empty object or Position
  address: string;
  error: string;
}

// Root state type (should be imported from your store file)
interface RootState {
  user: UserState;
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk<FetchAddressResponse, void, { rejectValue: string }>(
  'user/fetchAddress',
  async function (_, { rejectWithValue }) {
    try {
      // get the user's geolocation position
      const positionObj = await getPosition();
      const { coords } = positionObj;
      const position: Position = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      // use a reverse geocoding API to get a description of the user's address
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      // Payload of the FULFILLED state
      return { position, address };
    } catch {
      return rejectWithValue('Failed to fetch address');
    }
  }
);

const initialState: UserState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchAddress.fulfilled, (state, action: PayloadAction<FetchAddressResponse>) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload || 'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const getUser = (state: RootState) => state.user;
export const getUsername = (state: RootState) => state.user.username;