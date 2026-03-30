import {useEffect, useMemo, useState} from 'react'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage.jsx'
import DictationPage from './pages/DictationPage'
import VideoPage from './pages/VideoPage'
import VocabularyPage from './pages/VocabularyPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage'
import { ROUTES } from './constants/routes'

function getRouteFromHash() {
    if (typeof window === 'undefined') return ROUTES.LANDING
    const raw = window.location.hash.replace('#', '').trim()
    return raw || ROUTES.LANDING
}

export default function App() {
    const [route, setRoute] = useState(getRouteFromHash)

    useEffect(() => {
        const onHashChange = () => setRoute(getRouteFromHash())
        window.addEventListener('hashchange', onHashChange)
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    const page = useMemo(() => {
        switch (route) {
            case ROUTES.DICTATION:
                return <DictationPage/>
            case ROUTES.VIDEO:
                return <VideoPage/>
            case ROUTES.VOCABULARY:
                return <VocabularyPage/>
            case ROUTES.REGISTER:
                return <RegisterPage/>
            case ROUTES.LOGIN:
                return <LoginPage/>
            case ROUTES.PROFILE:
                return <ProfilePage/>
            case ROUTES.HOME:
                return <HomePage/>
            case ROUTES.LANDING:
            default:
                return <LandingPage/>
        }
    }, [route])

    return page || <LandingPage/>
}
