import React from "react"
import { Button, Input, Modal, Form } from "antd"
import FruitDisplays from "~/components/FruitDisplays"
import SearchButton from "~/components/SearchButton"

const list = [
  {
    id: 1,
    names: "hello",
    prices: "hi",
  },
  {
    id: 2,
    names: "whee",
    prices: "hiuwhdisadfsdafw",
  },
]

// For variables, function names: camelCase
// example: edit task editor => editTaskEditor

// For component names: PascalCase
// example: DefaultLayout, Sidebar, Row, Column,....

// For global constants: THEME, PRIMARY_COLOR_HEX,....

const Dashboard = () => {
  const [itemList, setitemList] = React.useState(list)
  const [isFormOpen, setisFormOpen] = React.useState(false)
  const [form] = Form.useForm()

  function checkSuccess() {
    console.log("success")
  }

  const onFinish = (values) => {
    const { id, ...submitValues } = values
    let transferList
    if (id) {
      // update the existed item
      transferList = [...itemList].map((item) => {
        if (item.id === id) {
          return {
            ...submitValues,
          }
        }

        return item
      })
    } else {
      // add new item
      transferList = [...itemList].concat([{ ...values }])
    }

    setitemList(transferList)
    setisFormOpen(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  function deleteTask(id) {
    const remainingTasks = [...itemList].filter((task) => id !== task.id)
    console.log("help, ", remainingTasks, id)
    setitemList(remainingTasks)
  }

  function addTask() {
    form.resetFields()
    setisFormOpen(true)
  }

  function editTask(values) {
    form.setFieldsValue({ ...values })
    setisFormOpen(true)
  }

  return (
    <div>
      <SearchButton />
      <div style={{ width: "100%" }}>
        <div
          className="text-[22px] mt-[10px] text-green-700 mb-[10px] "
          style={{ "text-align": "center" }}
        >
          <b>Choose a product:</b>
        </div>
        <div>
          <div className="content-center">
            <div className="flex flex-row justify-center">
              <div className="w-[50%] flex">
                <Input className="" placeholder="Cam sành" />
                <Button type="primary" onClick={checkSuccess}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <Button onClick={addTask} type="primary" block>
          Add item
        </Button>
        <Modal
          title={"Antd modal"}
          open={isFormOpen}
          onCancel={() => setisFormOpen(false)}
          onOk={onFinish}
          footer={[
            <Button key={"cancelBtn"} onClick={() => setisFormOpen(false)}>
              Cancel
            </Button>,
            <Button key={"submitBtn"} type={"primary"} htmlType={"submit"} form={"taskForm"}>
              Submit
            </Button>,
          ]}
        >
          <Form
            id={"taskForm"}
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name={"id"} hidden={true} />
            <Form.Item
              label="Name"
              name="names"
              rules={[
                {
                  required: true,
                  message: "Please input the name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Prices"
              name="prices"
              rules={[
                {
                  required: true,
                  message: "Please input your new price!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <div style={{ display: "flex", "flex-wrap": "wrap", "justify-content": "center" }}>
          {itemList.map((task) => (
            <FruitDisplays
              onEditButtonClick={() => editTask(task)}
              onDelete={deleteTask}
              key={task.id}
              {...task}
            />
          ))}
        </div>
        <div>
          <fetchPosts />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
