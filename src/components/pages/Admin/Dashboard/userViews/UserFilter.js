import React, { useContext, useRef, useEffect, useState } from "react";
import AdminContext from "../../../../../context/admin/adminContext";

const UserFilter = () => {
  const [value, setValue] = useState("");
  const adminContext = useContext(AdminContext);

  const text = useRef("");

  const { adminUserFilter, adminClearFilter, filtered } = adminContext;

  useEffect(() => {
    if (filtered == null) {
      text.current.value = "";
    }
  });

  // console.log("UserFilter.js", text);

  const onChange = e => {
    setValue(e.target.value);
    if (text.current.value !== "") {
      adminUserFilter(e.target.value);
    } else {
      adminClearFilter();
    }
  };

  return (
    <form>
      <div className="ui input">
        <input
          ref={text}
          type="text"
          value={value}
          placeholder="Filter Users"
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default UserFilter;
