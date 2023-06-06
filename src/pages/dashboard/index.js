import React from "react"
import { Col, Input, Row } from "antd"
import styled from "styled-components"

const StyledSearch = styled(Input.Search)`
  & .ant-input-group > .ant-input:first-child,
  .ant-input-group-addon:first-child {
    border-radius: 4;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  & .ant-input:hover,
  .ant-input:focus {
    border-color: green;
  }
  & .ant-input-search-button {
    background-color: green;
    border-radius: 4px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    & .anticon {
      color: white;
    }
    &:hover {
      background-color: green;
      border-color: green;
    }
  }
`

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="text-[22px] mt-[10px] mb-[20px] text-green-700">Home</div>
      <Row className="my-[10px]">
        <Col xs={24} lg={8}>
          <div>Sample component: </div>
          <div className="mt-[8px]">
            <StyledSearch />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
