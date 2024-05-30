import React from "react";
import EditUser from "./components/editUser";
import { useParams } from "react-router-dom";

function EditUserPage() {
  const params = useParams();
  const { userId } = params;
  console.log(userId);
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h2 className="font-bold text-lg">Sửa thông tin nhân sự</h2>
        <EditUser id={userId} />
      </div>
    </div>
  );
}

export default EditUserPage;
