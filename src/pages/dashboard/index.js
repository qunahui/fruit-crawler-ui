import React from "react"
import { Button, Input, Modal, Form, Pagination, AutoComplete } from "antd"
import FruitDisplays from "~/components/FruitDisplays"
import SearchButton from "~/components/SearchButton"
import axios from "axios"
import { debounce } from "lodash"

const DEFAULT_PARAMS = {
  search: "",
  page: 1,
  pageSize: 10,
}

const DEFALT_PAGINATION = {
  totalPages: 1,
  totalDocs: 1,
}

const Dashboard = () => {


  const [itemList, setitemList] = React.useState([])
  const [isFormOpen, setisFormOpen] = React.useState(false)
  const [pagination, setPagination] = React.useState(DEFALT_PAGINATION)
  const [params, setParams] = React.useState({ ...DEFAULT_PARAMS })
  const [form] = Form.useForm()
  const [options, setOptions] = React.useState([])
  const onSelect = (data) => {
    console.log("onSelect", data)
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  function deleteTask(id) {
    const remainingTasks = [...itemList].filter((task) => id !== task.id)
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
 
  async function postJSON(data) {
    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log("Success:", result)
      return result
    } catch (error) {
      console.error("Error:", error)
    }
  }

  async function editJSON(id, data) {
    try {
      const response = await fetch("http://localhost:8000/products/" + id + "?query=something", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log("Success:", result)
      return result
    } catch (error) {
      console.error("Error:", error)
    }
  }

 
  async function getList() {
    try {
      const result = await axios.get("http://localhost:8000/products", {
        params,
      })

      const { data: list, pagination } = result?.data || {}
      setitemList(list)
      setPagination(pagination)
    } catch (e) {
      console.log(e.message)
    }

  async function onFinish(values) {
    const { id, ...submitValues } = values
    if (id) {
      
      await editJSON(id, submitValues)
    } else {
      await postJSON(submitValues)
    }
    getList()
  }

  async function findAutoResults(text) {
    try {
      const response = await fetch("http://localhost:8000/products/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queries: text }),
      })
      const jsonData = await response.json()
      return jsonData
    } catch (error) {
      console.error(error)
    }
  }
  
  React.useEffect(() => {
    getList()
   
  }, [params])



 
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
                <AutoComplete
                  options={options}
                  style={{ width: 200 }}
                  onSelect={onSelect}
                  onSearch={debounce(
                    (text) =>
                      findAutoResults(text).then((data) => {
                        setOptions(data?.data?.map((item) => ({ value: item.names })))
                      }),
                    300,
                  )}
                  placeholder="input here"
                />
                <Button type="primary" onClick={checkSuccess}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        &nbsp;
        <div style={{ "text-align": "center" }}>
          <Pagination
            current={params?.page}
            total={pagination?.totalDocs}
            onChange={(page, pageSize) => setParams({ ...params, page, pageSize })}
            showSizeChanger
          />
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
          {itemList?.map((task) => (
            <FruitDisplays
              onEditButtonClick={() => editTask(task)}
              onDelete={deleteTask}
              key={task.id}
              {...task}
            />
          ))}
        </div>
      </div>
      <div>
        <div>
          <fetchPosts />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

