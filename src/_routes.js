import { lazy } from "react"
//
const DashboardPage = lazy(() => import("./pages/dashboard"))
const Page404 = lazy(() => import("./pages/notFound"))
const Login = lazy(() => import("src/components/Logsin"))

const routes = [
  {
    path: "/auth",
    component: Login,
    exact: true,
    isPublic: true,
  },
  {
    path: "/",
    component: DashboardPage,
    exact: true,
    isPublic: true,
  },
  {
    path: "/404",
    component: Page404,
    exact: true,
    isPublic: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
    isPublic: true,
  },
]

export { routes }
