import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = ({
  loadUser,
  setIsSignedIn,
 }) => {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();


  const onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        username: registerName,
        email: registerEmail,
        password: registerPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        loadUser(user);
        setIsSignedIn(true);
        navigate('/home');
      } else {
        // TODO: Better error handling
        alert('Unable to register. Please refresh and try again.');
      }
    })
    .catch(err => console.log('Error: ', err))
  }

  return (
    <div className="flex min-h-full">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center justify-center space-x-2 py-8">
            <img
              className="h-12 w-auto rounded-sm"
              src="/panda.jpg"
              alt="Panda"
            />
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 font-mono">Panda</h2>
          </div>
          <span className="tracking-tight text-gray-900 font-mono italic text-sm">We're not bamboozling you, it's real-time chat at its bear best.</span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Register your account</h2>

          <div className="mt-8">
            <div className="mt-6 bg-white py-8 px-4 shadow rounded-lg sm:px-10">
              <div className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      maxlength="20"
                      required
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
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
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="space-y-1">
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
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <button
                    type="submit"
                    onClick={onSubmitRegister}
                    className="flex w-full justify-center rounded-md bg-sky-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Sign up
                  </button>
                  <div>
                    <button type="button" onClick={() => navigate('/signin')} className="text-sm text-sky-600 hover:text-sky-500 cursor-pointer underline">
                      Or, login to your account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover rounded-lg"
          src="/big-panda.jpg"
          alt=""
        />
      </div>
    </div>
  )
}

export default Register;
