import { Pagination as Paginations } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Pagination({ currentPage, totalPage }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Paginations
        total={totalPage}
        initialPage={currentPage}
        showControls
        showShadow
        onChange={(page) => {
          navigate(`?page=${page}`);
        }}
      />
    </motion.div>
  );
}
