import { useNavigate } from 'react-router-dom';
import './style/Dashboard.css'
import LogoutButton from './LogoutButton';
import NewsFeed from './NewsFeed';

function Dashboard() {
    const navigate = useNavigate();
    const handleOnClickNotification = (e) => {
        e.preventDefault();
        navigate('/notificationSettings')
    }

    return (
        <>
            <div className='menu'>
                <button className='btn-notification' onClick={handleOnClickNotification}>
                    notification settings
                </button>
                <LogoutButton/>
                <NewsFeed/>
            </div>
        </>
    )
}

export default Dashboard;