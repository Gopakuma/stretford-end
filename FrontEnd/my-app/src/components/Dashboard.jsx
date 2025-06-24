import './style/Dashboard.css'
import LogoutButton from './Buttons/LogoutButton';
import NewsFeed from './NewsFeed';
import NotificationSettingsButton from './Buttons/NotificationSettingsButton';
import SquadButton from './Buttons/SquadButton';
import MatchdayButton from './Buttons/MatchdayButton';

function Dashboard() {
    return (
        <>
            <div>
                <NotificationSettingsButton/>
                <LogoutButton/>
                {/* <NewsFeed/> */}
                <SquadButton/>
                <MatchdayButton/>
            </div>
        </>
    )
}

export default Dashboard;