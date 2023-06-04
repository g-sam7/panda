import { useNavigate } from "react-router-dom"

const SignOut = ({ setIsSignedIn }) => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        setIsSignedIn(false);
        navigate('/');
      }}
      className="underline cursor-pointer text-sm"
    >
      Sign out
    </button>
  )
}

export default SignOut