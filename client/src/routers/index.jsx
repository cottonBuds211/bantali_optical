import { Routes, Route } from 'react-router-dom'
import Dashboard from '@/pages/Admin/Dashboard'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Patients from '@/pages/Admin/Patients'
import Appointments from '@/pages/Admin/Appointments'
import Users from '@/components/settings/Users'
import PatientProfile from '@/components/patients/PatientProfile'
import AddPatient from '@/pages/Admin/AddPatient'
import Login from '@/pages/Admin/Login'
import NotFound from '@/pages/404'
import RequireAuth from '@/components/RequireAuth'
import PersistLogin from '@/components/PersistLogin'
import App from '@/pages/App'
import { ThemeProvider } from '@/context/ThemeProvider'
import { AuthProvider } from '@/context/AuthProvider'
import { NotificationProvider } from '@/context/NotificationContext'
import Calendar from '@/pages/Admin/Calendar'
import Notifications from '@/pages/Admin/Notifications'
import Sales from '@/pages/Admin/Sales'
import SettingsLayout from '@/components/layout/SettingsLayout'
import Backup from '@/components/settings/Backup'
import Introduction from '@/components/settings/Introduction'
import { PatientProvider } from '@/context/PatientContext'
import AuditLogs from '@/components/settings/AuditLogs'
import Archives from '@/components/settings/Archives'
import VisitationMutliStep from '@/components/forms/VisitationMutliStep'
import AppLayout from '@/components/layout/AppLayout'
import Services from '@/components/app/Services'
import About from '@/components/app/About'
import ContactUs from '@/components/app/ContactUs'
import { SideBarProvider } from '@/context/SideBarContext'
import RoleBasedAccess from '@/components/RoleBasedAccess'
import Account from '@/components/settings/Account'

export const AdminRouter = () => {
	return (
		<AuthProvider>
			<NotificationProvider>
				<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
					<Routes>
						{/* Public Route */}
						<Route exact path='/' element={<Login />} />

						{/* Protected Routes */}
						<Route element={<PersistLogin />}>
							<Route element={<RequireAuth />}>
								<Route
									element={
										<SideBarProvider>
											<DefaultLayout />
										</SideBarProvider>
									}
								>
									<Route
										path='dashboard'
										element={<Dashboard />}
									/>
									<Route
										path='patients'
										element={<Patients />}
									/>
									<Route
										path='patients/add'
										element={<AddPatient />}
									/>
									<Route
										path='patients/profile/:patient_id'
										element={
											<PatientProvider>
												<PatientProfile />
											</PatientProvider>
										}
									/>
									<Route
										path='patients/profile/:patient_id/add-visit'
										element={
											<PatientProvider>
												<VisitationMutliStep />
											</PatientProvider>
										}
									/>
									<Route
										path='appointments'
										element={<Appointments />}
									/>
									<Route
										path='notifications'
										element={<Notifications />}
									/>
									<Route
										path='calendar'
										element={<Calendar />}
									/>
									<Route path='sales' element={<Sales />} />
									<Route
										path='help'
										element={<Introduction />}
									/>

									{/* Settings Layout Routes */}
									<Route
										path='settings'
										element={<SettingsLayout />}
									>
										<Route
											path='users'
											element={
												<RoleBasedAccess
													roles={['Admin']}
												>
													<Users />
												</RoleBasedAccess>
											}
										/>
										<Route
											path='backup'
											element={
												<RoleBasedAccess
													roles={['Admin']}
												>
													<Backup />
												</RoleBasedAccess>
											}
										/>
										<Route
											path='logs'
											element={
												<RoleBasedAccess
													roles={['Admin']}
												>
													<AuditLogs />
												</RoleBasedAccess>
											}
										/>
										<Route
											path='account'
											element={
												<RoleBasedAccess
													roles={['Staff']}
												>
													<Account />
												</RoleBasedAccess>
											}
										/>
										<Route
											path='archives'
											element={<Archives />}
										/>
									</Route>
								</Route>
							</Route>
						</Route>

						{/* Catch-all for Not Found */}
						<Route path='*' element={<NotFound />} />
					</Routes>
				</ThemeProvider>
			</NotificationProvider>
		</AuthProvider>
	)
}

export const AppRouter = () => {
	return (
		<NotificationProvider>
			<Routes>
				<Route path='' element={<AppLayout />}>
					<Route path='/' element={<App />} />
					<Route path='/services' element={<Services />} />
					<Route path='/about' element={<About />} />
					<Route path='/appointment' element={<ContactUs />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</NotificationProvider>
	)
}
