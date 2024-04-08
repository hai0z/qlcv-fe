import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
  CircularProgress,
  Button,
  Input,
  Spinner,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { calulateWorkProgress } from "../../utils/work";
import React, { useEffect } from "react";
import api from "../../api/config";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import StatsChart from "./components/statsChart";
function Stats() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    isOpen: isOpenStats,
    onOpen: onOpenStats,
    onOpenChange: onOpenChangeStats,
  } = useDisclosure();

  const [stats, setStats] = React.useState([]);

  const [startTime, setStartTime] = React.useState(
    dayjs().startOf("day").startOf("day").toISOString()
  );

  const [endTime, setEndTime] = React.useState(
    dayjs().endOf("day").endOf("day").toISOString()
  );

  const [statsModalData, setStatsModalData] = React.useState({});

  const [loading, setLoading] = React.useState(true);

  const handleSelectChange = (e) => {
    switch (e.target.value) {
      case "$.0":
        const startDay = dayjs().startOf("day").startOf("day").toISOString();
        const enDay = dayjs().endOf("day").endOf("day").toISOString();
        setStartTime(startDay);
        setEndTime(enDay);
        getStats(startDay, enDay);
        break;
      case "$.1":
        const startWeek = dayjs().startOf("week").startOf("day").toISOString();
        const endWeek = dayjs().endOf("week").endOf("day").toISOString();
        setStartTime(startWeek);
        setEndTime(endWeek);
        getStats(startWeek, endWeek);
        break;

      case "$.2":
        const startMoth = dayjs().startOf("month").toISOString();
        const endMoth = dayjs().endOf("month").toISOString();
        setStartTime(startMoth);
        setEndTime(endMoth);
        getStats(startMoth, endMoth);
        break;
      case "$.3":
        onOpen();
        break;
      default:
        break;
    }
  };

  const getStats = async (start, end) => {
    setLoading(true);
    const data = await api.get("/stats", {
      params: {
        startTime: start,
        endTime: end,
      },
    });
    setStats(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getStats(
      dayjs().startOf("day").startOf("day").toISOString(),
      dayjs().endOf("day").endOf("day").toISOString()
    );
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 xl:flex-row">
      <div className="w-full px-2">
        <h1 className="text-lg font-bold">Thống kê Chỉ số</h1>
        <Card className="mt-4" radius="none">
          <CardHeader>
            <div className="w-full flex items-center">
              <Select
                onChange={handleSelectChange}
                size="sm"
                label="Chọn ngày"
                className="max-w-xs"
              >
                <SelectItem value={0}>Hôm nay</SelectItem>
                <SelectItem value={1}>Tuần này</SelectItem>
                <SelectItem value={2}>Tháng này</SelectItem>
                <SelectItem value={3}>Tuỳ chọn</SelectItem>
              </Select>
            </div>
          </CardHeader>
          <Tabs className="mx-2">
            <Tab key="overview" title="Chung">
              <CardBody>
                <div className="w-full ">
                  <div className="mt-2 mb-4">
                    <span className="capitalize">
                      Từ: {dayjs(startTime).format("dddd DD/MM/YYYY HH:mm")}
                    </span>
                    <span className="mx-2"> đến </span>
                    <span className="capitalize">
                      {dayjs(endTime).format("dddd DD/MM/YYYY HH:mm")}
                    </span>
                  </div>
                  {loading ? (
                    <div className="w-full h-96 flex justify-center items-center">
                      <Spinner color="primary" size="md" />
                    </div>
                  ) : (
                    <Table
                      aria-label="Example static collection table"
                      radius="none"
                      selectionMode="single"
                    >
                      <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Avatar</TableColumn>
                        <TableColumn>Họ và tên</TableColumn>
                        <TableColumn>Tổng việc</TableColumn>
                        <TableColumn>Tỉ lệ hoàn thành</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {stats?.map((item, index) => (
                          <TableRow
                            className="cursor-pointer"
                            key={index}
                            onClick={() => {
                              onOpenStats();
                              setStatsModalData(item.WorkImplementer);
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Avatar src={item.avatar} />
                            </TableCell>
                            <TableCell>
                              <div>
                                <span className="font-bold">{item.name}</span>{" "}
                                <br />
                                <span className="text-sm text-foreground-400">
                                  {item.email}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{item.totalWork}</TableCell>
                            <TableCell>
                              <CircularProgress
                                showValueLabel
                                value={
                                  Number.isNaN(
                                    item.totalCompleted / item.totalWork
                                  )
                                    ? 0
                                    : (item.totalCompleted / item.totalWork) *
                                      100
                                }
                                color="success"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardBody>
            </Tab>
            <Tab key="stats" title="biểu đồ">
              <StatsChart data={stats} />
            </Tab>
          </Tabs>
        </Card>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Chọn ngày
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-row justify-between gap-4 items-center">
                  <Input
                    type="date"
                    value={dayjs(startTime).format("YYYY-MM-DD")}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  Đến
                  <Input
                    type="date"
                    value={dayjs(endTime).format("YYYY-MM-DD")}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    getStats(startTime, endTime);
                    onClose();
                  }}
                >
                  Xong
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ViewStatsModal
        isOpen={isOpenStats}
        onOpenChange={onOpenChangeStats}
        data={statsModalData}
      />
    </div>
  );
}
const ViewStatsModal = ({ data, isOpen, onOpenChange }) => {
  const status = {
    PENDING: "Chờ duyệt",
    IN_PROGRESS: "Đang thực hiện",
    PAUSE: "Đang tạm dừng",
    NEW: "Công việc mới",
    COMPLETED: "Đã hoàn thành",
  };
  const navigation = useNavigate();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Tiến độ công việc
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
                  <TableColumn>Tiến độ</TableColumn>
                  <TableColumn>Bắt đầu</TableColumn>
                  <TableColumn>Thời hạn</TableColumn>
                </TableHeader>
                <TableBody emptyContent="Không có dữ liệu">
                  {data.map((w, index) => {
                    const workProgess = calulateWorkProgress(w.Work);
                    return (
                      <TableRow
                        key={index}
                        className="cursor-pointer"
                        onClick={() => {
                          navigation(`/work-info/${w.Work.id}`);
                        }}
                      >
                        <TableCell>{w.Work.title}</TableCell>
                        <TableCell>{status[w.Work.status]}</TableCell>
                        <TableCell>
                          <CircularProgress
                            color="success"
                            value={workProgess}
                            showValueLabel
                          />
                        </TableCell>
                        <TableCell>
                          {dayjs(w.Work.startTime).format("DD/MM/YYYY HH:mm")}
                        </TableCell>
                        <TableCell>
                          {dayjs(w.Work.endTime).format("DD/MM/YYYY HH:mm")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="solid" onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default Stats;
