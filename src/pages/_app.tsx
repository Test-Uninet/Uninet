import { AuthProvider } from '@/context/authContext';
import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query'; // Make sure to import QueryClient here

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
