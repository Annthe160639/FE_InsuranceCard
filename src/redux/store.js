import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
