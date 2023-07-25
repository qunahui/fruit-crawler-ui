import React from "react"

sessionStorage.setItem("token", "")

async function loginUser(credentials) {
  try {
    const response = await axios.post("http://localhost:8000/products/jwtlogin", credentials)
    return response.data.token
  } catch (error) {
    return error.response.data.error.message
  }
}
export default function AuthPage({ setToken }) {
  const [username, setUsername] = React.useState()
  const [password, setPassword] = React.useState()
  const [displayMessage, setDisplayMessage] = React.useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = await loginUser({
      username,
      password,
    })
    setDisplayMessage(token)
    sessionStorage.setItem("token", token)
    setToken(token)
  }

  return (
    <section className="bg-gray-50 dark:bg-green-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold dark:text-white"></a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-3" action="" onSubmit={handleSubmit}>
              <div>
                {failedValidation == true && (
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-red-500 dark:text-red"
                  >
                    {displayMessage}
                  </label>
                )}
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Username:
                </label>
                <input
                  name="username"
                  id="userame"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:placeholder-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Password:
                </label>
                <input
                  name="password"
                  id="password"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:placeholder-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

AuthPage.proptTypes = {
  setToken: PropTypes.func.isRequired,
}
