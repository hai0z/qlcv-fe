import React, { useContext } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import {
  CheckCheck,
  Edit,
  LogOut,
  Pause,
  Play,
  RefreshCw,
  AlertTriangle,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
import useWorkStore from "../../../../store/workStore";
import { AuthContext } from "../../../../context/authProvider";
import { useNavigate } from "react-router-dom";
export default function ActionButton() {
  const navigate = useNavigate();
  const { work, updateWorkStatus, getWorkById, deleteWork } = useWorkStore(
    (state) => state
  );
  const workStatus = work.status;
  const { auth: user } = useContext(AuthContext);

  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = React.useState(false);

  const isAccepted = work.implementer.filter(
    (implementer) => implementer.userId === user.id
  )[0]?.accepted;

  const handleUpdateWorkStatus = async (workStatus) => {
    setLoading(true);
    toast.promise(updateWorkStatus(work.id, workStatus), {
      loading: "Đang thực hiện...",
      success: () => {
        setLoading(false);
        if (workStatus === "COMPLETED") {
          confetti();
        }
        getWorkById(work.id);
        return "Đã thực hiện";
      },
      error: "Đã xảy ra lỗi",
    });
  };

  const handleDeleWork = async () => {
    setLoading(true);
    toast.promise(deleteWork(work.id), {
      loading: "Đang xóa...",
      success: () => {
        setLoading(false);
        navigate("/", { replace: true });
        return "Đã xóa";
      },
      error: (err) => {
        setLoading(false);
        return err.message;
      },
    });
  };

  return (
    <div className="flex flex-row w-full">
      {work.createdBy.id === user?.id ? (
        <div className="flex flex-row w-full flex-wrap gap-2">
          {workStatus !== "PAUSE" &&
            workStatus !== "PENDING" &&
            workStatus !== "COMPLETED" && (
              <div className="flex flex-row justify-between gap-2">
                <Button
                  className="flex-1"
                  disabled={loading}
                  startContent={<CheckCheck />}
                  color="success"
                  onPress={() => {
                    handleUpdateWorkStatus("COMPLETED");
                  }}
                >
                  Hoàn thành
                </Button>
                <Button
                  disabled={loading}
                  startContent={<Pause />}
                  color="warning"
                  className="flex-1"
                  onPress={() => handleUpdateWorkStatus("PAUSE")}
                >
                  Tạm dừng
                </Button>
              </div>
            )}
          {workStatus === "COMPLETED" && (
            <Button
              disabled={loading}
              startContent={<RefreshCw />}
              color="primary"
              onPress={() => handleUpdateWorkStatus("IN_PROGRESS")}
              className="flex-1"
            >
              Làm lại
            </Button>
          )}
          {workStatus === "PENDING" && (
            <>
              <Button
                disabled={loading}
                startContent={<CheckCheck />}
                color="secondary"
                className="flex-1"
                onPress={() => {
                  handleUpdateWorkStatus("COMPLETED");
                  confetti();
                }}
              >
                Duyệt
              </Button>
              <Button
                disabled={loading}
                startContent={<RefreshCw />}
                color="primary"
                className="flex-1"
                onPress={() => {
                  handleUpdateWorkStatus("IN_PROGRESS");
                }}
              >
                Làm lại
              </Button>
            </>
          )}

          {workStatus === "PAUSE" && (
            <Button
              disabled={loading}
              startContent={<Play />}
              color="warning"
              className="flex-1"
              onPress={() => handleUpdateWorkStatus("IN_PROGRESS")}
            >
              Tiếp tục
            </Button>
          )}

          <Button
            as={Link}
            to={`/work-edit/${work.id}`}
            startContent={<Edit />}
          >
            Sửa
          </Button>
          <Button startContent={<X />} onPress={onOpen}>
            Xoá
          </Button>
        </div>
      ) : isAccepted === "ACCEPTED" ? (
        <div className="flex flex-row justify-between items-center w-full gap-2">
          {workStatus !== "PAUSE" &&
            workStatus !== "PENDING" &&
            workStatus !== "COMPLETED" && (
              <Button
                startContent={<CheckCheck />}
                color="success"
                className="flex-1"
                onPress={() => handleUpdateWorkStatus("PENDING")}
              >
                Hoàn thành
              </Button>
            )}
          {workStatus === "PENDING" && (
            <Button
              startContent={<CheckCheck />}
              color="secondary"
              className="flex-1"
              disabled={true}
            >
              Đợi duyệt
            </Button>
          )}
          {workStatus === "COMPLETED" && (
            <span className="flex flex-row items-center gap-2">
              <CheckCheck color="green" /> Công việc đã hoàn thành
            </span>
          )}
          {workStatus === "PAUSE" && (
            <span className="flex flex-row items-center gap-2">
              <Pause color="yellow" /> Công việc đang tạm dừng
            </span>
          )}
        </div>
      ) : !user.role === "ADMIN" ? (
        <div className="flex flex-row justify-between gap-4 w-full">
          <Button
            disabled={loading}
            startContent={<CheckCheck />}
            color="success"
            className="flex-1"
            onPress={() => {
              acceptWork(work.id, user.id);
            }}
          >
            Chấp nhận
          </Button>
          <Button
            disabled={loading}
            startContent={<LogOut />}
            color="default"
            onPress={() => declineWork(work.id, user.id)}
          >
            Rời việc
          </Button>
        </div>
      ) : (
        <span>Đang theo dõi công việc này</span>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <AlertTriangle color="red" />
                  <span> Xoá công việc</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>Bạn có chắc muốn xoá công việc hiện tại?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button color="primary" onPress={handleDeleWork}>
                  Xoá
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
