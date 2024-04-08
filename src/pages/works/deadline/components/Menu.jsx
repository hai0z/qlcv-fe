import React from "react";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Divider, Avatar } from "@nextui-org/react";
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function DeadLineMenu() {
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
              to="/deadline"
              as={Link}
              className={
                pathName === "/deadline"
                  ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                  : ""
              }
            >
              Công việc trễ hạn
            </ListboxItem>
            <ListboxItem
              key="copy"
              to="/deadline/upcoming"
              as={Link}
              className={
                pathName === "/deadline/upcoming"
                  ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                  : ""
              }
            >
              Công việc gần tới hạn
            </ListboxItem>
          </Listbox>
        </CardBody>
      </Card>
    </div>
  );
}

export default DeadLineMenu;
