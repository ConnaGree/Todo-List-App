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
        label: "LOW_PRIORITY",
        icon: PiCheckCircleFill,
        color: "#111"
    },
    {
        value: "Medium",
        label: "MED_PRIORITY",
        icon: PiWarningCircleFill,
        color: "#111"
    },
    {
        value: "High",
        label: "HIGH_PRIORITY",
        icon: PiWarningFill,
        color: "#ff3333"
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
                style={{ borderRadius: 0, border: '2px solid #000' }}
            >
                <div className="custom-dropdown__trigger-content">
                    <selectedOption.icon
                        style={{ color: selectedOption.color }}
                        size={18}
                    />
                    <span style={{ fontWeight: '700' }}>{selectedOption.label}</span>
                </div>
                <PiArrowDownBold
                    className={`custom-dropdown__arrow ${isOpen ? "open" : ""}`}
                    size={14}
                />
            </button>

            {isOpen && (
                <div className="custom-dropdown__menu" style={{ borderRadius: 0, border: '2px solid #000', boxShadow: '4px 4px 0 #000', display: 'flex', flexDirection: 'column' }}>
                    {PRIORITY_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isSelected = option.value === value;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                className={`custom-dropdown__option ${isSelected ? "selected" : ""}`}
                                onClick={() => handleSelect(option)}
                                style={{ borderRadius: 0 }}
                            >
                                <Icon style={{ color: option.color }} size={18} />
                                <span style={{ fontWeight: '700' }}>{option.label}</span>
                                {isSelected && (
                                    <PiCheckCircleFill
                                        className="custom-dropdown__check"
                                        size={16}
                                        style={{ color: '#000' }}
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
