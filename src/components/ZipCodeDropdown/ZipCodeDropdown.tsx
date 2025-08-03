"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ZipCodeDropdownProps } from "./ZipCodeDropdown.types";
import { US_ZIP_CODES, ZipCodeData } from "@/data/zipCodes";
import {
  DropdownContainer,
  Label,
  InputContainer,
  Input,
  DropdownIcon,
  DropdownList,
  DropdownItem,
  ZipCode,
  LocationInfo,
  NoResults,
  ErrorMessage,
} from "./ZipCodeDropdown.styles";

export const ZipCodeDropdown: React.FC<ZipCodeDropdownProps> = ({
  label = "Zip Code",
  value,
  onChange,
  placeholder = "Search zip code or city...",
  disabled = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter zip codes based on search term
  const filteredZipCodes = useMemo(() => {
    if (!searchTerm.trim()) {
      return US_ZIP_CODES.slice(0, 50); // Show first 50 by default
    }

    const term = searchTerm.toLowerCase();
    return US_ZIP_CODES.filter(
      (zipData) =>
        zipData.zipCode.includes(term) ||
        zipData.city.toLowerCase().includes(term) ||
        zipData.state.toLowerCase().includes(term) ||
        zipData.stateAbbr.toLowerCase().includes(term)
    ).slice(0, 100); // Limit to 100 results for performance
  }, [searchTerm]);

  // Update search term when value changes externally
  useEffect(() => {
    const selectedZip = US_ZIP_CODES.find(zip => zip.zipCode === value);
    if (selectedZip) {
      setSearchTerm(`${selectedZip.zipCode} - ${selectedZip.city}, ${selectedZip.stateAbbr}`);
    } else if (value) {
      setSearchTerm(value);
    } else {
      setSearchTerm("");
    }
  }, [value]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    
    // If the user types a 5-digit number, treat it as a direct zip code entry
    if (/^\d{5}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  // Handle item selection
  const handleItemSelect = (zipData: ZipCodeData) => {
    onChange(zipData.zipCode);
    setSearchTerm(`${zipData.zipCode} - ${zipData.city}, ${zipData.stateAbbr}`);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredZipCodes.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredZipCodes.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredZipCodes[highlightedIndex]) {
          handleItemSelect(filteredZipCodes[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <DropdownContainer>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          hasError={!!error}
          autoComplete="off"
        />
        <DropdownIcon isOpen={isOpen} disabled={disabled}>
          ▼
        </DropdownIcon>
      </InputContainer>
      
      <DropdownList ref={listRef} isOpen={isOpen}>
        {filteredZipCodes.length > 0 ? (
          filteredZipCodes.map((zipData, index) => (
            <DropdownItem
              key={zipData.zipCode}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleItemSelect(zipData)}
            >
              <ZipCode>{zipData.zipCode}</ZipCode>
              <LocationInfo>
                {zipData.city}, {zipData.stateAbbr}
              </LocationInfo>
            </DropdownItem>
          ))
        ) : (
          <NoResults>
            No zip codes found matching &ldquo;{searchTerm}&rdquo;
          </NoResults>
        )}
      </DropdownList>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </DropdownContainer>
  );
};
