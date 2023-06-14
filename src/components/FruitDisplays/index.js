import React from "react"
import "src/styles/tailwind.css"
import { Segmented, Space, Button } from "antd"
import { CloseOutlined, EditOutlined } from "@ant-design/icons"

function FruitDisplays({ id, names, prices, onDelete, onEditButtonClick }) {
  return (
    <div style={{ "margin-right": "4%" }}>
      <div
        style={{
          "margin-right": "2%",
          "margin-left": "2%",
        }}
      >
        <div style={{ "margin-bottom": "3em", "margin-top": "2em" }} />
        <Space direction="vertical">
          <Segmented
            options={[
              {
                label: (
                  <div
                    style={{
                      "padding-top": ".25em",
                      "padding-right": ".5em",
                      "padding-left": ".5em",
                    }}
                  >
                    <img
                      src={require("./exampleimage.png")}
                      style={{ "border-radius": "30px" }}
                    ></img>
                    <div style={{ display: "flex" }}>
                      <h1 style={{}}>
                        <b>{names}</b>
                      </h1>
                    </div>
                    <div style={{ display: "flex", "margin-bottom": "1em", "margin-right": "0em" }}>
                      <div
                        className="robotoextralight200"
                        style={{
                          "font-size": "30px",
                          "margin-left": "10%",
                          "text-overflow": "ellipsis",
                          "white-space": "nowrap",
                          overflow: "hidden",
                          width: "7em",
                          "padding-top": ".25em",
                        }}
                      >
                        {prices}
                        {/* <p
                          className="robotoextralight200"
                          style={{
                            "text-align": "center",
                            "margin-top": ".25em",
                            "text-overflow": "ellipsis",
                          }}
                        >
                        </p> */}
                      </div>
                      <img
                        src={require("./shopee-mall 1.png")}
                        style={{ height: "4em", width: "4em" }}
                      />
                    </div>
                    <div>
                      <Button onClick={() => onDelete(id)} icon={<CloseOutlined />} style={{}} />
                      <Button
                        onClick={onEditButtonClick}
                        icon={<EditOutlined />}
                        style={{ "margin-left": "10%" }}
                      />
                    </div>
                  </div>
                ),
                value: "user1",
              },
            ]}
          />
        </Space>
      </div>
    </div>
  )
}

export default FruitDisplays
