import React, { Suspense } from "react"
import BrowserRouter from "react-router-dom/es/BrowserRouter.js"
import { Switch, Route } from "react-router-dom"
import DefaultLayout from "~/components/DefaultLayout"
import AuthLayout from "./components/AuthLayout"
import AppLoading from "~/components/AppLoading"
import "./styles/tailwind.css"
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoading />}>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
