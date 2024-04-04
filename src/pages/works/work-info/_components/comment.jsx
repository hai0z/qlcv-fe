import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { MessageSquareMore } from "lucide-react";
import dayjs from "dayjs";
import { Delete, MoreVertical } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import useCommentStore from "../../../../store/commentStore";
import useWorkStore from "../../../../store/workStore";

function Comment() {
  const { work, getWorkById } = useWorkStore((state) => state);
  const { createComment, deleteComment } = useCommentStore((state) => state);
  const [commentContent, setCommentContent] = React.useState("");

  const addComment = async () => {
    if (!commentContent) {
      return;
    }
    toast.promise(createComment(work.id, commentContent), {
      loading: "Đang thêm bình luận...",
      success: () => {
        setCommentContent("");
        getWorkById(work.id);
        return "Đã thêm bình luận";
      },
      error: "Đã xảy ra lỗi",
    });
  };
  const handleDeleteComment = async (id) => {
    toast.promise(deleteComment(id), {
      loading: "Đang xóa...",
      success: () => {
        getWorkById(work.id);
        return "Đã xóa";
      },
      error: "Đã xảy ra lỗi",
    });
  };
  return (
    <div>
      <Card radius="none" className="p-4" shadow="sm">
        <CardBody>
          <div className="flex flex-row items-center gap-4">
            <Avatar size="md" showFallback name={work.createdBy.name || " "} />
            <Textarea
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
              placeholder="Bình luận của bạn..."
              minRows={2}
              variant="flat"
              className="flex-1"
              radius="none"
            />
            <Button onClick={addComment} className="ml-auto">
              Gửi
            </Button>
          </div>
          <div className="mt-8 flex flex-row gap-2 items-center">
            <MessageSquareMore size={16} />
            <span className="font-bold">Bình luận: </span>
          </div>
        </CardBody>
        {work.comments?.map((comment) => {
          return (
            <Card className="" shadow="none" radius="none" key={comment.id}>
              <CardBody className="my-2">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar
                      src={comment.createdBy?.avatar || ""}
                      name={comment.createdBy?.name || " "}
                      size="md"
                      showFallback
                    />
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {comment.createdBy.name}{" "}
                      </span>
                      <p className="text-sm mt-2">{comment.content}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-tiny">
                      {dayjs(comment.createdAt).fromNow()}
                    </p>
                    <Popover placement="top" radius="none">
                      <PopoverTrigger>
                        <MoreVertical size={16} className="cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="px-1 py-2">
                          <Button
                            onPress={() => handleDeleteComment(comment.id)}
                            radius="none"
                            variant="light"
                            endContent={
                              <Delete
                                color="hsl(var(--nextui-danger))"
                                size={16}
                              />
                            }
                            className="text-tiny"
                          >
                            Xoá
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Divider className="mt-4" />
              </CardBody>
            </Card>
          );
        })}
      </Card>
    </div>
  );
}

export default Comment;
