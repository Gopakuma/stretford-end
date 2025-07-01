import './style/Dashboard.css'
import NotificationSettingsButton from './Buttons/NotificationSettingsButton';
import SquadButton from './Buttons/SquadButton';
import MatchdayButton from './Buttons/MatchdayButton';
import Chat from './Chat';

function Dashboard() {
    return (
        <>
            <div>
                <NotificationSettingsButton/>
                {/* <NewsFeed/> */}
                <SquadButton/>
                <MatchdayButton/>
                <Chat/>
            </div>
        </>
    )
}

export default Dashboard;