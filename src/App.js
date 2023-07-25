import React, { Suspense } from "react"
import BrowserRouter from "react-router-dom/es/BrowserRouter.js"
import { Switch, Route } from "react-router-dom"
// import DefaultLayout from "~/components/DefaultLayout"
import Dashboard from "src/pages/dashboard"
import AuthLayout from "src/components/AuthLayout"
import AppLoading from "src/components/AppLoading"
import Logsin from "~/components/Logsin"
import "./styles/tailwind.css"

const App = () => {
  const [token, setToken] = React.useState()
  React.useEffect(() => {
    const loggedInToken = sessionStorage.getItem("token")

    if (loggedInToken) {
      setToken(loggedInToken)
    }
  }, [])

  if (!String(token).includes(".")) {
    return <Logsin setToken={setToken} failedValidation={true} />
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoading />}>
        <Switch>
          <Route path="/login" render={() => <AuthLayout setToken={setToken} />} />
          <Route path="/" render={() => <Dashboard Token={token} setToken={setToken} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
