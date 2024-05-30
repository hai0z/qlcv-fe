import { Input, NavbarContent, useDisclosure } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import React, { useEffect } from "react";
import useSearchStore from "../../store/searchStore";
import SearchModal from "./searchModal";

function SearchInput() {
  const { getResults, keyword, setKeyword, setResults, results } =
    useSearchStore();

  const inputRef = React.useRef(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSearch = (keyword) => {
    setResults([]);
    onOpen();
    getResults(keyword);
  };

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="start">
      <Input
        onChange={(e) => setKeyword(e.target.value)}
        ref={inputRef}
        classNames={{
          base: "max-w-full w-full h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        placeholder="Tìm công việc..."
        size="md"
        endContent={
          <SearchIcon
            className="cursor-pointer"
            size={24}
            onClick={() => {
              if (keyword) handleSearch(keyword);
            }}
          />
        }
        type="search"
      />
      <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </NavbarContent>
  );
}

export default SearchInput;
