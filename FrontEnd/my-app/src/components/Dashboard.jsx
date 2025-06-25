import './style/Dashboard.css'
import LogoutButton from './Buttons/LogoutButton';
import NewsFeed from './NewsFeed';
import NotificationSettingsButton from './Buttons/NotificationSettingsButton';
import SquadButton from './Buttons/SquadButton';
import MatchdayButton from './Buttons/MatchdayButton';
import Chat from './Chat';

function Dashboard() {
    return (
        <>
            <div>
                <NotificationSettingsButton/>
                <LogoutButton/>
                {/* <NewsFeed/> */}
                <SquadButton/>
                <MatchdayButton/>
                <Chat/>
            </div>
        </>
    )
}

export default Dashboard;