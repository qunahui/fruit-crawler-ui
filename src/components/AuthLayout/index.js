import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { Layout } from "antd"
import { routes } from "~/_routes"
import { Button, Input, Space } from 'antd'
const { Content } = Layout

const RenderComponent = ({ component: Component, isPublic = false, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) => (isPublic ? <Component {...props} /> : <Redirect to={"/"} />)}
      />
    </>
  )
}

const AuthLayout = () => {
  const renderRoutes = () =>
    routes.map((route) => <RenderComponent key={route.key || route.path} {...route} />)

  return (
    <Layout className={"site-layout"}>
      <Content
        className="site-main-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: "100vh",
          background: "white",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
        }}
      >
       <div className="bg-red-300">
        Authenticated headers
       <Switch>
          {renderRoutes()}
          <Redirect to="/404" />
        </Switch>
       </div>
      </Content>
      <Space.Compact style={{ width: '100%' }}>
      <Input defaultValue="Combine input and button" />
      <Button type="primary">Submit</Button>
      </Space.Compact>
    </Layout>
  )
}

// const ResultBlock =  () => {

// }

export default AuthLayout
