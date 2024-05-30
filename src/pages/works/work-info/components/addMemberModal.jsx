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
import { Search, UserRound } from "lucide-react";
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
    toast.success("Thêm thành công");
    getWorkById(work.id);
    onOpenChange(false);
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center mt-4">
        <span className="text-tiny">Người thực hiện</span>
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
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm người thực hiện
                </ModalHeader>
                <ModalBody>
                  <div className="sticky top-0 z-50">
                    <Input
                      placeholder="Tên người dùng..."
                      onChange={handleSearch}
                      value={searchTerm}
                      type="search"
                      endContent={<Search />}
                    />
                  </div>

                  {filteredUsers?.map((user, index) => (
                    <div className="w-full py-3" key={index}>
                      <Checkbox
                        value={user.id}
                        defaultSelected={isUserInWork(user.id)}
                        isDisabled={isUserInWork(user.id)}
                        onChange={handleSelectUser}
                        className="flex flex-row max-w-full items-center"
                      >
                        <div className="w-full flex flex-row items-center gap-2">
                          <Avatar src={user.avatar || ""} />
                          <h3>{user.name}</h3>
                        </div>
                      </Checkbox>
                    </div>
                  ))}
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
