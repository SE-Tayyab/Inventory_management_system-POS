import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

function CategoryList({ item, deleteCategory }) {
  const HandledeleteCategory = async (event) => {
    event.preventDefault();
    deleteCategory(item._id);
  };

  return (
    <tr style={{ width: "100%" }}>
      <td className="align-middle">
        <div className="d-flex align-items-center ">
          <img
            src={item.image}
            className="img-thumbnail"
            alt={item.name}
            style={{ maxWidth: "50px" }}
          />
        </div>
      </td>
      <td className="align-middle">
        <div className="d-flex align-items-start">
          <span className="me-2 fs-5">{item.name}</span>
        </div>
      </td>
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <span className="me-2 fs-5 text-danger">
            <DeleteOutlined onClick={HandledeleteCategory} />
          </span>
        </div>
      </td>
    </tr>
  );
}

export default CategoryList;
