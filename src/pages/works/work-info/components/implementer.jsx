import {
  Avatar,
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  ModalFooter,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativetime from "dayjs/plugin/relativeTime";
import { CheckSquare, Eye, MoreVertical, Plus } from "lucide-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import useWorkStore from "../../../../store/workStore";
import { AuthContext } from "../../../../context/authProvider";
import { Link } from "react-router-dom";
dayjs.extend(relativetime);
dayjs.locale("vi");

function Implementer() {
  const {
    updateWorkRequest,
    work,
    getWorkById,
    deleteWorkRequest,
    createWorkRequest,
    removeMemberFromWork,
  } = useWorkStore((state) => state);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selectedImplementer, setSelectedImplementer] = React.useState({});

  const [workRequestTitle, setWorkRequestTitle] = React.useState("");

  const { auth } = useContext(AuthContext);

  const addWorkRequest = async () => {
    toast.promise(
      createWorkRequest(
        workRequestTitle,
        selectedImplementer.implementerId,
        selectedImplementer.user,
        work.id
      ),
      {
        loading: "Đang thêm yêu cầu...",
        success: () => {
          getWorkById(work.id);
          onClose();
          setSelectedImplementer({});
          setWorkRequestTitle("");
          return "Đã thêm yêu cầu";
        },
        error: (err) => {
          setWorkRequestTitle("");
          toast.error(err.message);
        },
      }
    );
  };

  const updateCheckList = async (id, isCompleted) => {
    toast.promise(
      updateWorkRequest(
        id,
        {
          isCompleted,
        },
        work.id
      ),
      {
        loading: "Đang cập nhật...",
        success: () => {
          getWorkById(work.id);
          return "Đã cập nhật";
        },
        error: (err) => toast.error(err.message),
      }
    );
  };

  const handleDeleteWorkRequest = async (id) => {
    const option = confirm("Bạn muốn xóa yêu cầu này?");
    option &&
      toast.promise(deleteWorkRequest(id), {
        loading: "Đang xóa...",
        success: () => {
          getWorkById(work.id);
          return "Đã xóa";
        },
        error: (err) => toast.error(err.message),
      });
  };
  const handleRemoveImplementer = async (implementerId) => {
    const option = confirm("Bạn muốn xóa người này khỏi công việc hiện tại?");
    option &&
      toast.promise(removeMemberFromWork(work.id, implementerId), {
        loading: "Đang xóa...",
        success: () => {
          getWorkById(work.id);
          return "Đã xóa";
        },
        error: (err) => toast.error(err.message),
      });
  };
  return (
    <div>
      {work.implementer.map((implementer) => (
        <Card radius="none" className="p-4" shadow="sm" key={implementer.id}>
          <CardBody className="pb-8">
            <div className="flex flex-row gap-2 w-full">
              <Avatar
                size="lg"
                src={implementer.user.avatar || ""}
                isBordered
              />
              <div className="flex flex-col justify-center ml-4">
                <div className="flex flex-row gap-8">
                  <div className="w-40 flex-wrap">
                    <p className="text-lg font-bold">{implementer.user.name}</p>
                    <p>{implementer.user.email}</p>
                  </div>
                  <Popover placement="right">
                    <PopoverTrigger>
                      <MoreVertical size={16} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <Listbox aria-label="Actions">
                        <ListboxItem
                          key="new"
                          as={Link}
                          to={`/profile/${implementer.user.id}`}
                        >
                          Xem thông tin
                        </ListboxItem>
                        {auth.id === work.createdBy.id && (
                          <ListboxItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={() =>
                              handleRemoveImplementer(implementer.user.id)
                            }
                          >
                            Xoá khỏi công việc
                          </ListboxItem>
                        )}
                      </Listbox>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="ml-auto">
                {auth.role === "ADMIN" || auth.id === implementer.user.id ? (
                  <Button
                    onPress={() => {
                      onOpen();
                      setSelectedImplementer({
                        user: implementer.user.id,
                        implementerId: implementer.id,
                      });
                    }}
                    size="sm"
                    startContent={<CheckSquare size={13} />}
                  >
                    Thêm yêu cầu
                  </Button>
                ) : null}
              </div>
            </div>
            <Divider className="my-6" />
            <div className="ml-8">
              {implementer?.request.map((request, index) => (
                <div key={request.id} className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      isDisabled={
                        auth.role !== "ADMIN" && auth.id !== implementer.user.id
                      }
                      onChange={() =>
                        updateCheckList(request.id, !request.isCompleted)
                      }
                      size="lg"
                      color="success"
                      radius="none"
                      isSelected={request.isCompleted}
                      value={request.isCompleted}
                    />
                    <div className="flex flex-col gap-2">
                      <span>{request.title}</span>
                      <span className="text-xs text-foreground-400">
                        Lúc{" "}
                        {dayjs(request.createdAt).format("HH:mm, DD/MM/YYYY  ")}
                      </span>
                    </div>
                    {(auth.role === "ADMIN" ||
                      auth.id === implementer.user.id) && (
                      <div className="ml-auto">
                        <Popover placement="top">
                          <PopoverTrigger>
                            <MoreVertical
                              className="cursor-pointer"
                              size={16}
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <Button
                              onPress={() =>
                                handleDeleteWorkRequest(request.id)
                              }
                              variant="light"
                              size="sm"
                              color="danger"
                            >
                              Xoá
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs">
                      Cập nhật bởi: <b>{request?.createdBy?.name}</b> -{" "}
                      {dayjs(request.updatedAt).fromNow()}
                    </span>
                  </div>
                  {index < implementer?.request.length - 1 && (
                    <Divider className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thêm yêu câu
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="mt-4">
                  <span>Nội dung yêu cầu</span>
                  <Textarea
                    autoFocus
                    value={workRequestTitle}
                    onChange={(e) => setWorkRequestTitle(e.target.value)}
                    radius="none"
                    className="mt-4"
                    minRows={5}
                  ></Textarea>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color="primary"
                  onPress={addWorkRequest}
                  startContent={<Plus />}
                >
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Implementer;
