import React from "react"
import { Button, Input, Modal, Form, Pagination, AutoComplete, Spin } from "antd"
import FruitDisplays from "~/components/FruitDisplays"
import SearchButton from "~/components/SearchButton"
import axiosInstance from "~/utils/axios"
import { debounce } from "lodash"
//import { request } from "express"
axiosInstance.defaults.timeout = 8000000
const DEFAULT_PARAMS = {
  search: "",
  page: 1,
  pageSize: 10,
}

const DEFALT_PAGINATION = {
  totalPages: 1,
  totalDocs: 1,
}

const Dashboard = ({ Token, setToken }) => {
  const [itemList, setitemList] = React.useState([])
  const [isFormOpen, setisFormOpen] = React.useState(false)
  const [pagination, setPagination] = React.useState(DEFALT_PAGINATION)
  const [params, setParams] = React.useState({ ...DEFAULT_PARAMS })
  const [form] = Form.useForm()
  const [options, setOptions] = React.useState([])
  const [searchcontent, setSearchContent] = React.useState()
  const [loading, setLoading] = React.useState(false)

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

  async function removalValidation(list) {
    try {
      const validation = await axiosInstance.post("http://localhost:8000/products/jwtvalidation", {
        headers: { "Content-Type": "application/json", Authentication: Token },
      })
      if (validation) {
        deleteTask(list)
      }
    } catch (e) {
      console.log(e)
      setToken("")
    }
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
      const theresponse = await axiosInstance.post("http://localhost:8000/products/", {
        headers: { "Content-Type": "application/json", Authentication: Token },
        queries: data,
      })
      console.log(theresponse)
      return theresponse
    } catch (e) {
      console.log(e)
      setToken("")
    }
  }

  async function editJSON(id, data) {
    try {
      const theresponse = await axiosInstance.put(
        "http://localhost:8000/products/" + id + "?query=something",
        {
          headers: { "Content-Type": "application/json", Authentication: Token },
          queries: data,
        },
      )
      console.log(theresponse)
      setisFormOpen(false)
      return theresponse
    } catch (e) {
      console.log(e)
      setToken("")
    }
  }

  async function getList() {
    try {
      const result = await axiosInstance.get("http://localhost:8000/products", {
        params,
      })
      const { data: list, pagination } = result?.data || {}
      console.log(
        "The commonwealth of Venice in their armoury have this inscription: 'Happy is that city which in time of peace thinks of war.'",
      )
      console.log(result)
      setitemList(list)
      setPagination(pagination)
    } catch (e) {
      console.log(e.message)
    }
  }

  React.useEffect(() => {
    getList()
  }, [params])

  async function onFinish(values) {
    const { id, ...submitValues } = values
    if (id) {
      await editJSON(id, submitValues)
    } else {
      await postJSON(submitValues)
      setisFormOpen(false)
    }
    getList()
  }

  async function findAutoResults(text) {
    try {
      const theresponse = await axiosInstance.post("http://localhost:8000/products/autocomplete", {
        headers: { Authentication: Token },
        queries: text,
      })
      console.log(theresponse.data.searchoptions[0].map((item) => ({ value: item.names })))
      return theresponse.data.searchoptions[0]
    } catch (e) {
      console.log(e)
      setToken("")
    }
  }
  async function testSearch(e) {
    if (e.code == "Enter") {
      setLoading(true)
      try {
        const theresponse = await axiosInstance.post("http://localhost:8000/products/listeditor", {
          headers: { Authentication: Token },
          queries: searchcontent,
          timeout: 360000,
        })
        await console.log(theresponse)
        await getList()
        console.log("Ay me, how many perils doe enfold/The righteous man, to make him daily fall!")
        return setLoading(false)
      } catch (e) {
        console.log(e)
        setToken("")
      }
    }
  }
  function Spinner(statetest) {
    if (statetest == false) {
      return <></>
    } else {
      return (
        <div style={{ "padding-left": "1em", "padding-top": ".19em" }}>
          <Spin />
        </div>
      )
    }
  }

  return (
    <div>
      <SearchButton onSubmit={testSearch} />
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
                  style={{ width: 500 }}
                  onSelect={onSelect}
                  onSubmit={(text) => testSearch(text)}
                  onSearch={debounce(
                    (text) =>
                      findAutoResults(text).then((data) => {
                        setOptions(data?.map((item) => ({ value: item.names })))
                      }),
                    300,
                  )}
                  onKeyDown={(text) => testSearch(text)}
                  onChange={(text) => setSearchContent(text)}
                  placeholder="input here"
                />
                <Button type="primary" onClick={testSearch}>
                  one
                </Button>

                {Spinner(loading)}
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
              onDelete={removalValidation}
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
