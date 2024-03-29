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
} from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativetime from "dayjs/plugin/relativeTime";
import { CheckSquare, Eye, MoreVertical, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import useWorkStore from "../../../../store/workStore";
dayjs.extend(relativetime);
dayjs.locale("vi");

function Implementer() {
  const {
    updateWorkRequest,
    work,
    getWorkById,
    deleteWorkRequest,
    createWorkRequest,
  } = useWorkStore((state) => state);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selectedImplementer, setSelectedImplementer] = React.useState({});

  const [workRequestTitle, setWorkRequestTitle] = React.useState("");

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
          return "Đã thêm yêu cầu";
        },
        error: (err) => {
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

  return (
    <div>
      {work.implementer.map((implementer) => (
        <Card radius="none" className="p-4" shadow="sm" key={implementer.id}>
          <CardBody className="pb-8">
            <div className="flex flex-row gap-2">
              <Avatar
                size="lg"
                showFallback
                src={implementer.user.avatar || ""}
                name={implementer.user.name || " "}
              />
              <div className="flex flex-col justify-center">
                <div className="flex flex-row gap-8 items-center">
                  <p className="text-lg font-bold ml-4">
                    {implementer.user.name}
                  </p>
                  <Popover placement="right">
                    <PopoverTrigger>
                      <MoreVertical size={16} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">
                          <Link href={"#"}>Xem thông tin</Link>
                        </div>
                        <div className="text-tiny">
                          <Button>Xoá khỏi công việc</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-row ml-4 items-center">
                  <Eye
                    size={16}
                    className="mr-2"
                    color={implementer.seen ? "red" : "gray"}
                  />
                  <span>{implementer.seen ? "Đã xem" : "Chưa xem"}</span>
                </div>
              </div>
              <div className="ml-auto">
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
              </div>
            </div>
            <Divider className="my-6" />
            <div className="ml-8">
              {implementer?.request.map((request, index) => (
                <div key={request.id} className="flex flex-col">
                  <div className="flex flex-row items-center gap-2">
                    <Checkbox
                      onChange={() =>
                        updateCheckList(request.id, !request.isCompleted)
                      }
                      size="lg"
                      color="warning"
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
                    <div className="ml-auto">
                      <Popover placement="top">
                        <PopoverTrigger>
                          <MoreVertical className="cursor-pointer" size={16} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <Button
                            onPress={() => handleDeleteWorkRequest(request.id)}
                            variant="light"
                            size="sm"
                          >
                            Xoá
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
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
