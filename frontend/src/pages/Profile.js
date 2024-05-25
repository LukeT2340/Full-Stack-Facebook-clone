import styles from "../styles/Profile.module.css"
import {useState} from 'react'
import { useProfile } from "../hooks/useProfile"
import { useParams } from "react-router-dom"
import { FaCamera, FaPlus, FaPen, FaChevronDown } from 'react-icons/fa';
import Statuses from "../sharedComponents/Statuses"
import UpdateStatus from "../sharedComponents/UpdateStatus";
import { useAuthContext } from "../hooks/useAuthContext";
import NewStatusModal from "../sharedComponents/NewStatusModal";

// Profile page
const Profile = () => {
    const clientUserJson = localStorage.getItem('user');
    const clientUser = JSON.parse(clientUserJson);
    const { userId } = useParams()
    const { profile: pageProfile, isProfileLoading: isPageProfileLoading } = useProfile(userId) // Get profile of the person's profile page we are viewing
    const { profile: clientProfile, isProfileLoading: isClientProfileLoading} = useProfile(clientUser.user_id) // Get the profile of the client user

    if (isPageProfileLoading || isClientProfileLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className={`${styles.profilePageContainer} d-flex flex-column justify-content-center align-items-center`}>
            <ProfileTop pageProfile={pageProfile} clientProfile={clientProfile} />
            <ProfileBottom pageProfile={pageProfile} clientProfile={clientProfile} />
        </div>
    )
}

// Top part of the profile page
const ProfileTop = ({clientProfile, pageProfile}) => {
    return (
        <div className={`col-xl-7 col-lg-8 col-md-10 col-sm-12`}>
            <div className={`${styles.profileTop} d-flex flex-column flex-md-row justify-content-center align-items-md-end`}>
                <div className="col-xl-6 col-lg-6  order-1 order-md-1 mt-auto mt-md-0">
                    <ProfilePictureAndName pageProfile={pageProfile} />
                </div>
                <div className="col-xl-6 col-lg-6  order-2 order-md-2 mt-auto mt-md-0">
                    <AddStoryAndEditProfileButtons clientProfile={clientProfile} pageProfile={pageProfile} />
                </div>
            </div>
        </div>
    )
}

// Bottom part of the profile page
const ProfileBottom = ({pageProfile, clientProfile}) => {
    return (
        <div className={styles.profileBottomBackground}>
            <div className={`col-xl-7 col-lg-8 col-md-10 col-sm-12`}>
                <div className={`${styles.profileBottom} d-flex flex-column flex-md-row justify-content-center`}>
                    {/* Left side */}
                    <div className="col-xl-5 col-lg-4 col-md-10 col-12 mx-2">
                        <Intro profile={pageProfile}/>
                    </div>

                    {/* Right side */}
                    <div className="col-xl-7 col-lg-8 col-md-10 col-12 mx-2">
                        <UpdateStatus clientProfile={clientProfile} recipientProfile={pageProfile} />
                        <Statuses pageProfile={pageProfile} clientProfile={clientProfile} onlyFetchOwnStatuses={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Profile picture and name at the top of the screen
const ProfilePictureAndName = ({pageProfile}) => {
    return (
        <div className={`${styles.profilePictureAndName} mt-auto`}>
            <img className={styles.profilePicture} src={pageProfile.profilePictureUrl} alt="Profile picture"></img>
            <FaCamera className={styles.cameraIcon} />
            <h1>{`${pageProfile.firstName} ${pageProfile.lastName}`}</h1>
        </div>
    )
}

// Add story and edit profile buttons
const AddStoryAndEditProfileButtons = ({pageProfile, clientProfile}) => {
    const { user } = useAuthContext()
    const [showNewStatusForm, setShowNewStatusForm] = useState(false); 

    // Open new status form
    const handleOpenNewStatusForm = () => {
        setShowNewStatusForm(true)
    };

    // Close new status form
    const handleCloseNewStatusForm = () => {
        setShowNewStatusForm(false)
    };

    if (user.user_id != pageProfile._id) {
        return
    }

    return(
        <div className="d-flex flex-wrap justify-content-end mt-auto mb-4">
            <button className={styles.addStoryButton} onClick={handleOpenNewStatusForm}>
                <FaPlus />
                <p>Add to story</p>
            </button>
            <button className={styles.editProfileButton}>
                <FaPen />
                <p>Edit profile</p>
            </button>
            <button className={styles.peopleYouMayKnowButton}><FaChevronDown /></button>
            <NewStatusModal recipientProfile={pageProfile} clientProfile={clientProfile} show={showNewStatusForm} handleClose={handleCloseNewStatusForm} />
        </div>
    )
}

const Intro = ({profile}) => {

    return (
        <div className={styles.introContainer}>
            <h4>Intro</h4>
            {profile.bio ? (
                <button>Edit bio</button>
             ) : (
                <button>Add bio</button>
            )}
            <button>Edit details</button>
            <button>Add featured</button>
        </div>
    )
}

export default Profile