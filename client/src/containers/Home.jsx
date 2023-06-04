import SignOut from "../components/SignOut";
import Textarea from "../components/Textarea";

const Home = ({ user, setIsSignedIn }) => {
  return (
    <div>
      <div className="absolute top-0 right-0 p-8">
        <SignOut setIsSignedIn={setIsSignedIn}/>
      </div>
      <div className="absolute bottom-0 w-5/6 py-8">
        <Textarea user={user} />
      </div>
    </div>
  )
}

export default Home;