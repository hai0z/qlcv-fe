import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox,
  Avatar,
  Card,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { UserRound } from "lucide-react";

export default function AddMemberToWorkModal() {
  const [listUser, setListUser] = React.useState([]);

  const [selectedUsers, setSelectedUsers] = React.useState([]);

  useEffect(() => {}, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAddMember = async () => {};

  const handleSelectUser = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedUsers([...selectedUsers, value]);
    } else {
      setSelectedUsers(selectedUsers.filter((i) => i !== value));
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center mt-4">
        <span className="text-tiny ml-8">Người thực hiện</span>
        <Button
          size="sm"
          radius="lg"
          onPress={onOpen}
          startContent={<UserRound size={13} />}
        >
          <span className="text-small">Thêm </span>
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm người thực hiện
                </ModalHeader>
                <ModalBody>
                  <div>
                    <Input placeholder="Tên người dùng..." />
                  </div>
                  <div>
                    {listUser.map((user, index) => (
                      <Card
                        radius="none"
                        className="my-2"
                        key={user.id}
                        shadow={"sm"}
                      >
                        <CardHeader>
                          <div className="flex flex-row items-center gap-2">
                            <Checkbox
                              value={user.id}
                              onChange={handleSelectUser}
                            />
                            <Avatar
                              src={user.avatar || ""}
                              showFallback
                              name={user.name || user.email}
                            />
                            <h3>{user.name}</h3>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" onPress={handleAddMember}>
                    Thêm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
