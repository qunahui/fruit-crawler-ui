import React from "react"

import { ReactComponent as Help } from "~/assets/svg/help.svg"
import { ReactComponent as Avatar } from "~/assets/svg/avatar.svg"

const svgs = {
  help: Help,
  avatar: Avatar,
}

export default function Svg({ name, fill, width = 18, height = 18, style = {}, ...props }) {
  const SvgComponent = svgs?.[name] || svgs?.default
  return (
    <div className={"mx-[4px] relative cursor-pointer"} style={{ width, height, ...style }}>
      <SvgComponent
        fill={fill || "var(--mid-gray)"}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        {...props}
      />
    </div>
  )
}
