import React from "react";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Divider, Avatar } from "@nextui-org/react";
import { Eye, Pencil, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Menu() {
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
            <ListboxSection title="Tổng quan" showDivider>
              <ListboxItem
                key="overview"
                to="/users"
                as={Link}
                className={
                  pathName === "/users"
                    ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground mb-1"
                    : "mb-1"
                }
              >
                Tất cả các nhân sự
              </ListboxItem>
              <ListboxItem
                key="stats"
                as={Link}
                to="/users/stats"
                className={
                  pathName === "/users/stats"
                    ? "bg-[hsl(var(--nextui-primary))] text-primary-foreground"
                    : ""
                }
              >
                Thống kê chỉ số
              </ListboxItem>
            </ListboxSection>
            <ListboxSection title="Hành động">
              <ListboxItem
                as={Link}
                to="/users/add-user"
                key="add"
                className="text-success"
                color="success"
                startContent={<PlusCircle />}
              >
                Thêm nhân sự
              </ListboxItem>
            </ListboxSection>
          </Listbox>
        </CardBody>
      </Card>
    </div>
  );
}

export default Menu;
