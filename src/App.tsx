import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage.jsx'
import DictationPage from './pages/DictationPage'
import VideoPage from './pages/VideoPage'
import VocabularyPage from './pages/VocabularyPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import { ROUTES } from './constants/routes'
import AppAdmin from './admin/AppAdmin'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
    return (
        <Routes>
            <Route path="/admin/*" element={<AppAdmin />} />
            <Route path={ROUTES.LANDING} element={<LandingPage />} />
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.DICTATION} element={<DictationPage />} />
            <Route path={ROUTES.VIDEO} element={<VideoPage />} />
            <Route path={ROUTES.VOCABULARY} element={<VocabularyPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.TERMS} element={<TermsPage />} />
            <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
            <Route path={ROUTES.CONTACT} element={<ContactPage />} />
            <Route path={ROUTES.BLOG} element={<BlogPage />} />
            <Route path={ROUTES.FEATURES} element={<FeaturesPage />} />
            <Route path={ROUTES.PRICING} element={<PricingPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
