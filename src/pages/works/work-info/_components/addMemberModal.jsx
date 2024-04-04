import React, { useEffect, useState } from "react";
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
  Listbox,
  ListboxItem,
  ListboxWrapper,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { UserRound } from "lucide-react";
import useUserStore from "../../../../store/userStore";
import useWorkStore from "../../../../store/workStore";
export default function AddMemberToWorkModal() {
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [users, setUsers] = useState([]);

  const { getListUsers, listUsers } = useUserStore((state) => state);

  const { addMemberToWork, work, getWorkById } = useWorkStore((state) => state);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      const users = await getListUsers();
      setFilteredUsers(users);
    })();
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSelectUser = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setUsers([...users, value]);
    } else {
      setUsers(users.filter((i) => i !== value));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredUsers(
      listUsers.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const isUserInWork = (id) => {
    return work.implementer.filter((i) => i.userId === id).length > 0;
  };
  const handleAddMembers = async () => {
    for (let i = 0; i < users.length; i++) {
      await addMemberToWork(work.id, users[i]);
    }
    toast.success("Them thanh cong");
    getWorkById(work.id);
    onOpenChange(false);
  };
  console.log(users);
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
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="lg"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm người thực hiện
                </ModalHeader>
                <ModalBody>
                  <div>
                    <Input
                      placeholder="Tên người dùng..."
                      onChange={handleSearch}
                      value={searchTerm}
                    />
                  </div>
                  <div>
                    {filteredUsers?.map((user, index) => (
                      <div
                        className="flex flex-row items-center gap-2 py-3"
                        key={user.id}
                      >
                        <Checkbox
                          value={user.id}
                          defaultSelected={isUserInWork(user.id)}
                          isDisabled={isUserInWork(user.id)}
                          onChange={handleSelectUser}
                        />
                        <Avatar
                          src={user.avatar || ""}
                          showFallback
                          name={user.name || user.email}
                        />
                        <h3>{user.name}</h3>
                      </div>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Đóng
                  </Button>
                  <Button color="primary" onPress={handleAddMembers}>
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
