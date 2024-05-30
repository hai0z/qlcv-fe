import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Avatar,
} from "@nextui-org/react";
import React from "react";
import useUserStore from "../../store/userStore";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const { createUser } = useUserStore((state) => state);

  const fileRef = React.useRef();

  const [seletedImage, setSelectedImage] = React.useState(null);

  const navigation = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email phải đúng định dạng")
      .required("Email là bắt buộc"),
    name: yup.string().required("Tên là bắt buộc"),
    address: yup.string(),
    phone: yup
      .string()
      .required("Số điện thoại là bắt buộc")
      .matches(
        /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
        "Số điện thoại không hợp lệ"
      ),
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
      console.log(values);
      if (!seletedImage) {
        handleCreateUser({
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
        handleCreateUser({
          ...values,
          avatar: json.data.url,
        });
      }
    },
  });

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

  const handleCreateUser = async (value) => {
    toast.promise(
      createUser({
        ...value,
      }),
      {
        loading: "Đang tạo ...",
        success: () => {
          return "Tạo thành công";
        },
        error: (err) => err.message,
      }
    );
  };
  return (
    <div className="w-full flex flex-col gap-8 xl:flex-row">
      <form className="w-full">
        <h2 className="font-bold text-lg">Thêm mới nhân sự</h2>
        <Card className="mt-4" radius="none">
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
              <div>
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
                {formik.errors.email && formik.touched.email && (
                  <p className="text-danger text-small mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
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
                {formik.errors.name && formik.touched.name && (
                  <p className="text-danger text-small mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div>
                <Input
                  size="md"
                  placeholder="Địa chỉ"
                  label="Địa chỉ"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  labelPlacement="outside"
                />
                {formik.errors.address && formik.touched.address && (
                  <p className="text-danger text-small mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>
              <div>
                <Input
                  size="md"
                  placeholder="Số điện thoại"
                  label="Số điện thoại"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  labelPlacement="outside"
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-danger text-small mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <div className="flex flex-row justify-between gap-4">
                <Button
                  className="flex-1"
                  color="primary"
                  onPress={formik.handleSubmit}
                >
                  Thêm nhân sự
                </Button>
                <Button color="secondary" onPress={() => navigation(-1)}>
                  Quay lại
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  );
}

export default AddUser;
