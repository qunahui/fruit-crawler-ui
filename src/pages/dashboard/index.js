import React from "react"
import { Button, Input, Modal, Form, Pagination, AutoComplete } from "antd"
import FruitDisplays from "~/components/FruitDisplays"
import SearchButton from "~/components/SearchButton"
import axios from "axios"
import { debounce } from "lodash"
// import TextField from "@mui/material/TextField"
// import Autocomplete from "@mui/material/Autocomplete"

// For variables, function names: camelCase
// example: edit task editor => editTaskEditor

// For component names: PascalCase
// example: DefaultLayout, Sidebar, Row, Column,....

// For global constants: THEME, PRIMARY_COLOR_HEX,....

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
  // const list = [
  //   {
  //     id: 1,
  //     names: "hello",
  //     prices: "hi",
  //   },
  //   {
  //     id: 2,
  //     names: "whee",
  //     prices: "hiuwhdisadfsdafw",
  //   },
  // ]

  const [itemList, setitemList] = React.useState([])
  const [isFormOpen, setisFormOpen] = React.useState(false)
  const [pagination, setPagination] = React.useState(DEFALT_PAGINATION)
  const [params, setParams] = React.useState({ ...DEFAULT_PARAMS })
  const [form] = Form.useForm()

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

  // async function pagecount() {
  //   console.log("opening")
  //   const response = await fetch("http://localhost:8000/products/totalvaluescount/")
  //   const result = await response.json()
  //   const passingresult = (await result.total) * 10
  //   setPagination(passingresult)
  // }

  // const pagesnumber = pagecount()

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

    // return fetch("http://localhost:8000/products")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const { data: list, meta } = data
    //     setitemList(list)
    //     setPagination(meta)
    //   })
    //   .catch((err) => {
    //     console.log(err.message)
    //     console.log("HELPME")
    //   })
  }

  React.useEffect(() => {
    getList()
    // pagecount()
  }, [params])

  //const helper = Array(Array(posts.data)[0])

  function checkSuccess() {
    console.log("success")
  }

  async function onFinish(values) {
    const { id, ...submitValues } = values
    if (id) {
      // update the existed item
      // transferList = [...itemList].map((item) => {
      //   if (item.id === id) {
      //     return {
      //       ...submitValues,
      //     }
      //   }
      //   return item
      // })
      await editJSON(id, submitValues)
    } else {
      await postJSON(submitValues)

      // add new item
      // transferList = [...itemList].concat([{ ...values }])
    }

    getList()
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  function deleteTask(id) {
    const remainingTasks = [...itemList].filter((task) => id !== task.id)
    console.log("help, ", remainingTasks, id)
    setitemList(remainingTasks)
    // postJSON(itemList)
  }

  function addTask() {
    form.resetFields()
    setisFormOpen(true)
  }
  // async function sizeChangeUpdater(pageSize) {
  //   console.log("Let's go")
  //   try {
  //     const response = await fetch("http://localhost:8000/products/sizeChangerUpdater", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ size: pageSize }),
  //     })
  //     const result = await response.json()
  //     console.log("Success:", result)
  //     console.log("logger", pageSize)
  //     getList()
  //     console.log("passingthrough")
  //     return result
  //   } catch (error) {
  //     console.error("Whoops:", error)
  //   }
  // }

  function editTask(values) {
    form.setFieldsValue({ ...values })
    setisFormOpen(true)
    // postJSON(itemList)
  }
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // async function paginationChangeHandler(page, pageSize) {
  //   console.log("Let's go")
  //   try {
  //     const response = await fetch("http://localhost:8000/products/pagination", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ numbers: page }),
  //     })
  //     const result = await response.json()
  //     console.log("Success:", result)
  //     console.log("logger", pageSize)
  //     getList()
  //     console.log("passingthrough")
  //     return result
  //   } catch (error) {
  //     console.error("Whoops:", error)
  //   }
  // }
  // const mockVal = (str, repeat = 1) => ({
  //   value: str.repeat(repeat),
  // })

  // const mockVal = (str: string, repeat = 1) => ({
  //   value: str.repeat(repeat),

  // })
  const [options, setOptions] = React.useState([])

  async function findAutoResults(text) {
    try {
      console.log("Ground Control")
      const response = await fetch("http://localhost:8000/products/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queries: text }),
      })
      await console.log("onet")
      const jsonData = await response.json()
      return jsonData
    } catch (error) {
      console.error("Whoops:", error)
    }
  }

  const onSelect = (data) => {
    console.log("onSelect", data)
  }
  // const getPanelValue = (value) => {
  //   itemList.filter((thing) => String(thing.names).startsWith(value))
  // }

  // const getPanelValue = (searchText: string) =>
  //   !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]

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
            // onShowSizeChange={sizeChangeUpdater}
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

/*
  Step 1: Define a param objects: 
  { page: 1, pageSize: 10 }
  Step 2: Send this param objects to the backend
  Step 3: Backend will use these information to slice correct chunk of array match the page and pageSize
  Step 4: Backend send the result back

  const [params, setParams] = useState({ page: 1, pageSize: 10 })

  onChange: (page) => setParams({ ...params, page }) 
  onSizeChange: (pageSize) => setParams({ ...params, pageSize }) 

  useEffect(() => {
    //fetch data from server
  }, [parmas])
*/
