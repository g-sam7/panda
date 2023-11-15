import { useState } from 'react';

import ChatRoom from './ChatRoom';
import SignOut from "../components/SignOut";
import Sidebar from "../components/Sidebar";
import SearchBar from '../components/SearchBar';

const userIcon = (email) => {
  return (
    <div className="flex-shrink-0">
      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-gray-600 text-lg font-semibold">
          {email?.substring(0, 2).toUpperCase()}
        </span>
      </div>
    </div>
  )
};

const Home = ({ user, setIsSignedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { email, username } = user;

  const navigation = [
    { name: 'John Doe', href: '#', icon: userIcon, current: false },
  ]
  const userNavigation = [
    { key: 1, component: <div>Your Profile</div> },
    { key: 2, component: <SignOut setIsSignedIn={setIsSignedIn}/> },
  ]

  return (
    <>
      <div className="fixed inset-0">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />
        <div className="lg:pl-72">
          <SearchBar
            userNavigation={userNavigation}
            userIcon={userIcon}
            username={username}
            email={email}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="py-10">
            <ChatRoom user={user} />
          </main>
        </div>
      </div>
    </>
  )
}

export default Home;
