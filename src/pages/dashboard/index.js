import React from "react"
import { Button, Input, Modal, Form } from "antd"
import FruitDisplays from "~/components/FruitDisplays"

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
  const [ilist, setIlist] = React.useState(list)
  const [addisOpen, setIsOpen] = React.useState(false)
  const [form] = Form.useForm()

  function loggerpro() {
    console.log("success")
  }

  const onFinish = (values) => {
    // console.log(editedtask)
    // console.log(values)
    // const newList = ilist
    // console.log(newList[editedtask - 1])
    // newList[editedtask.id - 1].names = values.name
    // newList[editedtask.id - 1].prices = values.password
    const { id, ...submitValues } = values
    let newList
    if (id) {
      // update the existed item
      newList = [...ilist].map((item) => {
        if (item.id === id) {
          return {
            ...submitValues,
          }
        }

        return item
      })
    } else {
      // add new item
      newList = [...ilist].concat([{ ...values }])
    }

    setIlist(newList)
    setIsOpen(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  function deleteTask(id) {
    const remainingTasks = [...ilist].filter((task) => id !== task.id)
    console.log("help, ", remainingTasks, id)
    setIlist(remainingTasks)
  }

  function addTask() {
    form.resetFields()
    setIsOpen(true)
  }

  function editTask(values) {
    form.setFieldsValue({ ...values })
    setIsOpen(true)
  }

  return (
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
              <Button type="primary" onClick={loggerpro}>
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
      {/* <ReactModal
        isOpen={isOpen2}
        contentLable="Example Modal"
        onRequestClose={() => setIsOpen2(false)}
      >
        
      </ReactModal> */}
      {/* <ReactModal
        isOpen={addisOpen}
        contentLable="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      ></ReactModal> */}
      <Modal
        title={"Antd modal"}
        open={addisOpen}
        onCancel={() => setIsOpen(false)}
        onOk={onFinish}
        footer={[
          <Button key={"cancelBtn"} onClick={() => setIsOpen(false)}>
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
        {ilist.map((task) => (
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
  )
}

export default Dashboard
