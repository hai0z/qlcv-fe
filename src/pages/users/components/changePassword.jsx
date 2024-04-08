import React, { useContext } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import * as yup from "yup";
import { useFormik } from "formik";
import useUserStore from "../../../store/userStore";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/authProvider";
function ChangePassword() {
  const { changePassword } = useUserStore((state) => state);

  const { auth } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      currentPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
      newPassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
      confirmPassword: yup
        .string()
        .required("Vui lòng nhập lại mật khẩu mới")
        .oneOf([yup.ref("newPassword"), null], "Mật khẩu nhập lại không khớp"),
    }),
    onSubmit: async (values) => {
      toast.promise(
        changePassword(auth.id, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
        {
          loading: "Đang thay đổi mật khẩu",
          success: "Thay đổi mật khẩu thành công",
          error: (error) => error.message,
        }
      );
    },
  });

  return (
    <Card className="" radius="none">
      <CardHeader>
        <h1 className="text-2xl font-bold">Đổi mật khẩu</h1>
      </CardHeader>
      <CardBody>
        <div>
          <form className="flex flex-col gap-6 p-2">
            <div>
              <Input
                type="password"
                value={formik.values.currentPassword}
                placeholder="Mật khẩu hiện tại"
                onChange={formik.handleChange}
                name="currentPassword"
                labelPlacement="outside"
                label="Mật khẩu hiện tại"
              />
              {formik.errors.currentPassword && (
                <p className="text-danger text-small">
                  {formik.errors.currentPassword}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                value={formik.values.newPassword}
                placeholder="Mật khẩu mới"
                onChange={formik.handleChange}
                name="newPassword"
                labelPlacement="outside"
                label="Mật khẩu mới"
              />
              {formik.errors.newPassword && (
                <p className="text-danger text-small">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>
            <div>
              <Input
                type="password"
                value={formik.values.confirmPassword}
                placeholder="Nhập lại mật khẩu mới"
                onChange={formik.handleChange}
                name="confirmPassword"
                labelPlacement="outside"
                label="Nhập lại mật khẩu mới"
              />
              {formik.errors.confirmPassword && (
                <p className="text-danger text-small">
                  {formik.errors.confirmPassword}
                </p>
              )}
            </div>
            <Button onPress={formik.handleSubmit} color="primary">
              Đổi mật khẩu
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>
  );
}

export default ChangePassword;
