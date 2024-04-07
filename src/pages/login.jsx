import React, { useContext } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Avatar,
} from "@nextui-org/react";
import { AuthContext } from "../context/authProvider";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import api from "../api/config";
export default function Login() {
  const { handleLogin } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await handleLogin(values.email, values.password);
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email phải đúng định dạng")
        .required("Email là bắt buộc"),
      password: yup.string().required("Mật khẩu là bắt buộc"),
    }),
  });

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen px-8">
      <form className="w-full md:w-1/3" autoComplete="off">
        <Card radius="sm">
          <CardHeader>
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <Avatar
                src="https://banner2.cleanpng.com/20190304/tkq/kisspng-vnua-logo-business-administration-brand-university-trang-ch-vcms-trung-tm-cung-ng-ngun-n-5c7cf001ba0764.950890031551691777762.jpg"
                className="w-36 h-36"
              />
              <span className="text-3xl font-bold capitalize">
                Quản lí công việc
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="w-full flex flex-col gap-8">
              <div>
                <Input
                  size="md"
                  placeholder="Email"
                  label="Email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                  autoComplete="false"
                  labelPlacement="outside"
                />

                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger text-small mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <Input
                  size="md"
                  placeholder="Mật khẩu"
                  label="Mật khẩu"
                  name="password"
                  autoComplete="false"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  labelPlacement="outside"
                />
                {formik.errors.password && formik.touched.password && (
                  <p className="text-danger text-small mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <Button size="md" color="primary" onPress={formik.handleSubmit}>
                Đăng nhập
              </Button>
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  );
}
