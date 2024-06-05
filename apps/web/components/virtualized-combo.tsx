import {
  Option,
  VirtualizedComboboxProps,
  VirtualizedCommandProps,
} from "@/app/lib/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/ui/popover";
import { cn } from "@ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VirtualizedCommand = ({
  height,
  options,
  placeholder,
  selectedOption,
  onSelectOption,
}: VirtualizedCommandProps) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const virtualOptions = virtualizer.getVirtualItems();

  const handleSearch = (search: string) => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput onValueChange={handleSearch} placeholder={placeholder} />
      <CommandEmpty>No item found.</CommandEmpty>
      <CommandList>
        <CommandGroup
          ref={parentRef}
          style={{
            height: height,
            width: "100%",
            overflow: "scroll",
          }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {virtualOptions.map((virtualOption) => (
              <CommandItem
                className="space-y-4"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualOption.size}px`,
                  transform: `translateY(${virtualOption.start}px)`,
                }}
                key={filteredOptions[virtualOption.index].value}
                value={filteredOptions[virtualOption.index].value}
                onSelect={onSelectOption}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedOption.value ===
                      filteredOptions[virtualOption.index].value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {filteredOptions[virtualOption.index].label}
              </CommandItem>
            ))}
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export function VirtualizedCombobox({
  options,
  searchPlaceholder = "Search courses...",
  width = "400px",
  height = "400px",
  callback,
}: VirtualizedComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "" });

  useEffect(() => {
    if (callback) {
      callback(selectedOption);
    }
  }, [selectedOption, callback]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(" overflow-auto w-full max-w-[470px] flex relative")}
        >
          <div className="flex flex-row items-center justify-start gap-4 text-primary">
            <span>{selectedOption.label || searchPlaceholder}</span>
            <ChevronsUpDown className="h-4 w-4 absolute right-3" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: width, overflow: "auto" }}
      >
        <VirtualizedCommand
          height={height}
          options={options}
          placeholder={searchPlaceholder}
          selectedOption={selectedOption}
          onSelectOption={(currentValue) => {
            const newSelectedOption = options.find(
              (option) => option.value === currentValue
            );
            if (newSelectedOption) {
              setSelectedOption(newSelectedOption);
            }
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
