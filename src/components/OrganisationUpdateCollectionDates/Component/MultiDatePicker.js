import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const format = "MM/DD/YYYY";

// export default function MultiDatePicker() {
//   const [dates, setDates] = useState([
//     // new DateObject().set({ day: 4, format }),
//     // new DateObject().set({ day: 25, format }),
//     // new DateObject().set({ day: 20, format })
//   ]);

export const MultiDatePicker = (props) => {
  const { dates } = props;
  console.log("m", "dates", dates);
  return (
    <div className="App">
      <div style={{ textAlign: "start" }}>
        <div className="input-text-label">
          Select Dates
          <span className="mandate-field text-label">*</span>
        </div>
        <DatePicker
          value={dates}
          onChange={dates}
          multiple
          placeholder="Select the dates"
          sort
          format={format}
          calendarPosition="bottom-center"
          plugins={[<DatePanel />]}
        />
      </div>
      {/* <ul>
        {dates.map((date, index) => (
          <li key={index}>{date.format()}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default MultiDatePicker;
