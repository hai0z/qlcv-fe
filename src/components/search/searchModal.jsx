import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableColumn,
} from "@nextui-org/react";
import useSearchStore from "../../store/searchStore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const workStatus = {
  IN_PROGRESS: "đang thực hiện",
  COMPLETED: "đã hoàn thành",
  PAUSE: "đã tạm dừng",
  PENDING: "chọn duyệt",
};

const HighlightText = ({ text, keyword }) => {
  const keywordSet = new Set(keyword.toLowerCase().split(""));

  const parts = text
    .toLowerCase()
    .split("")
    .map((char, index) => {
      if (keywordSet.has(char)) {
        return (
          <span className="text-primary font-bold" key={index}>
            {char}
          </span>
        );
      }
      return char;
    });

  return <p>{parts}</p>;
};
export default function SearchModal({ isOpen, onOpenChange }) {
  const { results, keyword } = useSearchStore();
  const navigation = useNavigate();
  return (
    <>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span>
                  Có <span className="font-bold">{results.length}</span> kết quả
                  tìm kiếm phù hợp với từ khoá:{" "}
                  <span className="font-bold text-primary">{keyword}</span>
                </span>
              </ModalHeader>
              <ModalBody>
                <Table
                  aria-label="Example static collection table"
                  radius="none"
                  selectionMode="single"
                >
                  <TableHeader>
                    <TableColumn>Công việc</TableColumn>
                    <TableColumn>Trạng thái</TableColumn>
                    <TableColumn>Bắt đầu</TableColumn>
                    <TableColumn>Thời hạn</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="Không có dữ liệu">
                    {results.map((w, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="cursor-pointer"
                          onClick={() => {
                            onClose();
                            navigation("/work-info/" + w.id);
                          }}
                        >
                          <TableCell>
                            <HighlightText text={w.title} keyword={keyword} />
                          </TableCell>
                          <TableCell>{workStatus[w.status]}</TableCell>

                          <TableCell>
                            {dayjs(w.startTime).format("DD/MM/YYYY HH:mm")}
                          </TableCell>
                          <TableCell>
                            {dayjs(w.endTime).format("DD/MM/YYYY HH:mm")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
