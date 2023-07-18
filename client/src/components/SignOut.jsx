import { useNavigate } from "react-router-dom"

const SignOut = ({ setIsSignedIn }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    fetch('http://localhost:3000/signout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setIsSignedIn(false);
        navigate('/');
      } else {
        console.log('Error signing out');
      }
    })
    .catch(err => console.log('Error: ', err))
  };
  return (
    <button
      type="button"
      className="underline cursor-pointer text-sm"
      onClick={() => {
        handleSignOut();
      }}
    >
      Sign out
    </button>
  )
}

export default SignOut