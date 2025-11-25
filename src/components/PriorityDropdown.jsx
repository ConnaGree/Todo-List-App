import { useState, useRef, useEffect } from "react";
import {
    PiArrowDownBold,
    PiCheckCircleFill,
    PiWarningCircleFill,
    PiWarningFill
} from "react-icons/pi";

const PRIORITY_OPTIONS = [
    {
        value: "Low",
        label: "Low priority",
        icon: PiCheckCircleFill,
        color: "#34d399"
    },
    {
        value: "Medium",
        label: "Medium priority",
        icon: PiWarningCircleFill,
        color: "#fbbf24"
    },
    {
        value: "High",
        label: "High priority",
        icon: PiWarningFill,
        color: "#fb7185"
    },
];

const PriorityDropdown = ({ value, onChange, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = PRIORITY_OPTIONS.find(opt => opt.value === value) || PRIORITY_OPTIONS[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
            <button
                type="button"
                className="custom-dropdown__trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="custom-dropdown__trigger-content">
                    <selectedOption.icon
                        style={{ color: selectedOption.color }}
                        size={18}
                    />
                    <span>{selectedOption.label}</span>
                </div>
                <PiArrowDownBold
                    className={`custom-dropdown__arrow ${isOpen ? "open" : ""}`}
                    size={14}
                />
            </button>

            {isOpen && (
                <div className="custom-dropdown__menu">
                    {PRIORITY_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isSelected = option.value === value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                className={`custom-dropdown__option ${isSelected ? "selected" : ""}`}
                                onClick={() => handleSelect(option)}
                            >
                                <Icon style={{ color: option.color }} size={18} />
                                <span>{option.label}</span>
                                {isSelected && (
                                    <PiCheckCircleFill
                                        className="custom-dropdown__check"
                                        size={16}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PriorityDropdown;
