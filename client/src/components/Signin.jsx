  import { useState } from "react";
  import { useNavigate } from 'react-router-dom';

  const Signin = ({
    loadUser,
    setIsSignedIn,
  }) => {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitSignIn = () => {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if (!user.id) {
          alert('Incorrect email or password. Please try again.');
        } else {
          loadUser(user);
          setIsSignedIn(true);
          navigate('/home');
        }
      })
      .catch(err => console.log('Error: ', err))
    }

    return (
      <>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 py-4">
            <img
              className="h-16 w-auto rounded-sm"
              src="/panda.jpg"
              alt="Panda"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Login to Panda </h2>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={onSubmitSignIn}
                    className="flex w-full justify-center rounded-md bg-sky-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <button type="button" onClick={() => navigate('/register')} className="text-sm text-sky-600 hover:text-sky-500 cursor-pointer underline">
                  Or, register your account
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };

  export default Signin;
