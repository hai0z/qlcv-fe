import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Avatar,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import useUserStore from "../../../store/userStore";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function EditUser({ id }) {
  const { getUserById, updateUser } = useUserStore((state) => state);
  const [seletedImage, setSelectedImage] = React.useState(null);

  const navigation = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email phải đúng định dạng")
      .required("Email là bắt buộc"),
    name: yup.string().required("Tên là bắt buộc"),
    address: yup.string(),
    phone: yup.string().required("Số điện thoại là bắt buộc"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      address: "",
      phone: "",
      avatar: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!seletedImage) {
        handleUpdateUser({
          ...values,
        });
      } else {
        const apiKey = "959ae633aff2f33ce1f548b6408d78f2";
        const api = "https://api.imgbb.com/1/upload?key=" + apiKey;
        const formData = new FormData();
        formData.append("image", seletedImage);
        const data = await fetch(api, {
          method: "POST",
          body: formData,
        });
        const json = await data.json();
        handleUpdateUser({
          ...values,
          avatar: json.data.url,
        });
      }
    },
  });
  useEffect(() => {
    (async () => {
      const user = await getUserById(id);
      formik.setValues(user);
    })();
  }, []);

  const fileRef = React.useRef();

  const handleChooseImage = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result;
      formik.setFieldValue("avatar", base64data);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateUser = async (value) => {
    toast.promise(
      updateUser(id, {
        ...value,
      }),
      {
        loading: "Đang cập nhật...",
        success: "Đã cập nhật",
        error: (err) => err.message,
      }
    );
  };
  return (
    <Card className="mt-4" radius="none">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <CardBody>
          <CardHeader>
            <div className="justify-center items-center w-full flex flex-col">
              <div className="relative">
                <Avatar
                  src={formik.values.avatar || ""}
                  className="w-32 h-32  cursor-pointer"
                  onClick={() => fileRef.current.click()}
                />
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  onChange={handleChooseImage}
                />
              </div>
            </div>
          </CardHeader>
          <div className="flex flex-col gap-6 p-2">
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              size="md"
              name="email"
              placeholder="Email"
              type="email"
              label="Email"
              labelPlacement="outside"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger text-small">{formik.errors.email}</p>
            )}
            <Input
              size="md"
              placeholder="Họ và tên"
              type="text"
              label="Họ và tên"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              labelPlacement="outside"
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-danger text-small">
                {formik.errors.name}
              </span>
            )}
            <Input
              size="md"
              placeholder="Địa chỉ"
              label="Địa chỉ"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              labelPlacement="outside"
            />
            <Input
              size="md"
              placeholder="Số điện thoại"
              label="Số điện thoại"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              labelPlacement="outside"
            />
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-danger text-small">
                {formik.errors.phone}
              </span>
            )}
            <div className="flex flex-row justify-between gap-4">
              <Button
                value="Cập nhật"
                color="primary"
                className="flex-1"
                onPress={formik.handleSubmit}
              >
                Lưu thay đổi
              </Button>
              <Button color="secondary" onPress={() => navigation(-1)}>
                Quay lại
              </Button>
            </div>
          </div>
        </CardBody>
      </form>
    </Card>
  );
}

export default EditUser;
