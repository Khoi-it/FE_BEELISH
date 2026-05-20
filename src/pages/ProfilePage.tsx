import { useState } from 'react'
import AppHeader from '../components/layout/AppHeader.jsx'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileStats from '../components/profile/ProfileStats'
import ProgressChart from '../components/profile/ProgressChart'
import StudyHistory from '../components/profile/StudyHistory'
import EditProfileModal from '../components/profile/EditProfileModal'

export default function ProfilePage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background font-body text-on-background">
            <div className="mx-auto max-w-[1440px] px-4 py-6">
                <AppHeader />

                <div className="space-y-8 mt-8">
                    <ProfileHeader onEditClick={() => setIsEditModalOpen(true)} />
                    
                    <ProfileStats />

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <ProgressChart />
                        <StudyHistory />
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditProfileModal onClose={() => setIsEditModalOpen(false)} />
            )}
        </div>
    )
}
