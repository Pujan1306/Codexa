import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { LoginForm } from './components/Forms/login';
import { SignupForm } from './components/Forms/signup';
import { ThemeProvider } from './components/ui/theme-provider';
import { ProtectedRoute, AuthRedirect } from './middleware/ProtectedRoute';
import { Dashboard } from './components/Dashboard/dashboard';
import { LandingPage } from './components/Landing/page';
import { PracticePage } from './components/Dashboard/Practice Page/practice';
import { ProblemPage } from './components/Dashboard/Problem Page/problem-page';
import { SessionPage } from './components/Dashboard/Session Page/session-page';
import { SettingsPage } from './components/Dashboard/Settings Page/setting-page';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<AuthRedirect />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/login" element={<AuthRedirect />}>
            <Route index element={<LoginForm />} />
          </Route>
          <Route path="/signup" element={<AuthRedirect />}>
            <Route index element={<SignupForm />} />
          </Route>
          <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard />} />} />
          <Route path="/dashboard/practice" element={<ProtectedRoute children={<PracticePage />} />} />
          <Route path="/dashboard/practice/problem/:id" element={<ProtectedRoute children={<ProblemPage />} />} />
          <Route path="/session/:id" element={<ProtectedRoute children={<SessionPage />} />} />
          <Route path="/dashboard/settings" element={<ProtectedRoute children={<SettingsPage />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
