import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Divider, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function WorkStatusMenu() {
  const pathName = useLocation().pathname;

  return (
    <div
      className="w-full xl:w-4/12 mt-[44px]"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3, delay: 0.25 }}
    >
      <Card radius="none">
        <CardHeader>
          <h2 className="font-bold text-lg">Menu</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <Listbox aria-label="Actions">
            <ListboxItem
              key="list"
              to="/work-status"
              as={Link}
              className={
                pathName === "/work-status"
                  ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                  : ""
              }
            >
              Đang thực hiện
            </ListboxItem>
            <ListboxItem
              className={
                pathName === "/work-status/new"
                  ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                  : ""
              }
              key="list"
              to="/work-status/new"
              as={Link}
            >
              Công việc mới
            </ListboxItem>
            <ListboxItem
              className={
                pathName === "/work-status/completed"
                  ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                  : ""
              }
              key="copy"
              to="/work-status/completed"
              as={Link}
            >
              Đã hoàn thành
            </ListboxItem>
            <ListboxItem
              key="copy"
              className={
                pathName === "/work-status/pasue"
                  ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                  : ""
              }
              to="/work-status/pasue"
              as={Link}
            >
              Tạm dừng
            </ListboxItem>
            <ListboxItem
              key="copy"
              className={
                pathName === "/work-status/pending"
                  ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                  : ""
              }
              to="/work-status/pending"
              as={Link}
            >
              Chờ duyệt
            </ListboxItem>
          </Listbox>
        </CardBody>
      </Card>
    </div>
  );
}

export default WorkStatusMenu;
