import './style/Dashboard.css'
import LogoutButton from './Buttons/LogoutButton';
import NewsFeed from './NewsFeed';
import NotificationSettingsButton from './Buttons/NotificationSettingsButton';
import SquadButton from './Buttons/SquadButton';
import Matchday from './Matchday';

function Dashboard() {
    return (
        <>
            <div>
                <NotificationSettingsButton/>
                <LogoutButton/>
                {/* <NewsFeed/> */}
                <SquadButton/>
                <Matchday/>
            </div>
        </>
    )
}

export default Dashboard;