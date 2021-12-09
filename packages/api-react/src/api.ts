import { createApi } from '@reduxjs/toolkit/query/react';
import skynetLazyBaseQuery from './skynetLazyBaseQuery';

export const baseQuery = skynetLazyBaseQuery({});

export default createApi({
  reducerPath: 'skynetApi',
  baseQuery,
  endpoints: () => ({}),
});
