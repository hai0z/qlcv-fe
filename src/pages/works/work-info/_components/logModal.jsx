import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  Button,
  useDisclosure,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import dayjs from "dayjs";
import React from "react";
import useWorkStore from "../../../../store/workStore";
import { ChevronRight } from "lucide-react";
export default function Log() {
  const { work } = useWorkStore((state) => state);

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button variant="light" onPress={onOpen}>
        Cập nhật : {work.WorkLog.length} lượt <ChevronRight />
      </Button>
      <Modal
        size="5xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>
            <span className="text-lg font-bold">
              Lịch sử cập nhật công việc
            </span>
          </ModalHeader>
          <ModalBody>
            {work.WorkLog?.map((item) => (
              <div key={item.id} className="w-full  flex flex-col gap-4 my-2">
                <span className="text-tiny text-gray-400">
                  {dayjs(item.createdAt).format("HH:mm:ss, dddd, DD/MM/YYYY  ")}
                </span>
                <span className="text-sm text-primary">{item.content}</span>
                <Divider />
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" color="primary" onPress={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
