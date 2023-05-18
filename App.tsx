import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListScreen from './src/list/ListScreen';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ListScreen />
    </QueryClientProvider>
  );
};

export default App;
