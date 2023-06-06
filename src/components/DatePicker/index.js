import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs"
import generateDatePicker from "antd/es/date-picker/generatePicker"
import generateRangePicker from "antd/es/date-picker/generatePicker/generateRangePicker"

// import "antd/es/date-picker/style/index"


const DatePicker = generateDatePicker(dayjsGenerateConfig)
const RangePicker = generateRangePicker(dayjsGenerateConfig)

export { DatePicker, RangePicker }
