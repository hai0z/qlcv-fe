import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Avatar,
} from "@nextui-org/react";
import React from "react";
import { ImagePlus, Pencil } from "lucide-react";
import useUserStore from "../../store/userStore";
import toast from "react-hot-toast";

const DEFAULT_PASSWORD = "12345678";
const DEFAULT_IMAGE = "https://picsum.photos/200/300";
function AddUser() {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    name: "",
    role: "USER",
    address: "",
    password: "12345678",
    phone: "",
    avatar: DEFAULT_IMAGE,
  });

  const { createUser } = useUserStore((state) => state);

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const fileRef = React.useRef();

  const [seletedImage, setSelectedImage] = React.useState(null);

  const handleChooseImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result;
      setSelectedImage(base64data);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateUser = async () => {
    toast.promise(
      createUser({
        ...userInfo,
        avatar: seletedImage || DEFAULT_IMAGE,
      }),
      {
        loading: "Đang tạo ...",
        success: () => {
          setUserInfo({
            email: "",
            name: "",
            role: "USER",
            address: "",
            password: "12345678",
            avatar: "",
            phone: "",
          });
          return "Tạo thành công";
        },
        error: (err) => err.message,
      }
    );
  };
  return (
    <div className="w-full flex flex-col gap-8 xl:flex-row">
      <div
        className="w-full"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-bold text-lg">Thêm mới nhân sự</h2>
        <Card className="mt-4" radius="none">
          <CardBody>
            <CardHeader>
              <div className="justify-center items-center w-full flex flex-col">
                <div className="relative">
                  <Avatar
                    src={seletedImage}
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
            <div className="flex flex-col gap-8 p-2">
              <Input
                value={userInfo.email}
                onChange={handleInput}
                size="md"
                name="email"
                placeholder="Email"
                type="email"
                label="Email"
                labelPlacement="outside"
              />
              <Input
                size="md"
                placeholder="Họ và tên"
                type="text"
                label="Họ và tên"
                name="name"
                value={userInfo.name}
                onChange={handleInput}
                labelPlacement="outside"
              />
              <Input
                size="md"
                placeholder="Địa chỉ"
                label="Địa chỉ"
                name="address"
                value={userInfo.address}
                onChange={handleInput}
                labelPlacement="outside"
              />
              <Input
                size="md"
                placeholder="Số điện thoại"
                label="Số điện thoại"
                name="phone"
                value={userInfo.phone}
                onChange={handleInput}
                labelPlacement="outside"
              />
              <div className="flex flex-row justify-between gap-4">
                <Button
                  className="flex-1"
                  color="primary"
                  onPress={handleCreateUser}
                >
                  Thêm nhân sự
                </Button>
                <Button color="secondary">Quay lại</Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default AddUser;
