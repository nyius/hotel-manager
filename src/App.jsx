import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
//---------------------------------------------------------------------------------------------------//
import GlobalStyles from './styles/GlobalStyles';
//---------------------------------------------------------------------------------------------------//
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Booking from './pages/Booking';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './ui/AppLayout';
import Checkin from './pages/Checkin';

// Set up our new queryCLient
const queryClient = new QueryClient({
	// Optional options
	defaultOptions: {
		queries: {
			// How long cached data is good for before being re-fetched (60s * 1000ms = 1min, 0 = always fetch again )
			statleTime: 0,
		},
	},
});

function App() {
	//---------------------------------------------------------------------------------------------------//
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							<Route index element={<Navigate replace to="dashboard" />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="account" element={<Account />} />
							<Route path="bookings" element={<Bookings />} />
							<Route path="booking/:bookingId" element={<Booking />} />
							<Route path="checkin/:bookingId" element={<Checkin />} />
							<Route path="cabins" element={<Cabins />} />
							<Route path="users" element={<Users />} />
							<Route path="Settings" element={<Settings />} />
						</Route>
						<Route path="login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: `8px` }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 3000,
						},
						styles: {
							fontSize: `16px`,
							maxWidth: `500px`,
							padding: `16px 24px`,
							backgroundColor: `var(--color-grey-0)`,
							color: `var(--color-grey-700)`,
						},
					}}
				/>
			</QueryClientProvider>
		</>
	);
}

export default App;
