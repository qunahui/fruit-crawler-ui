import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import DefaultLayout from "~/components/DefaultLayout"
import AppLoading from "~/components/AppLoading"

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoading />}>
        <Switch>
          <Route path="/" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
