import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
import useDebounce from "../../hooks/useDebounce";

const InputBox: React.FC = () => {
    const [textInput, setTextInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const debouncedTextInput = useDebounce(textInput, 300);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await response.json();
                const suggestionArr = data.map((user: any) => user.name);
                setSuggestions(suggestionArr);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };

    useEffect(() => {
        if (textInput) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [textInput]);

    useEffect(() => {
        if (debouncedTextInput) {
            setLoading(false);
        }
    }, [debouncedTextInput]);

    const handleSuggestionClick = (index: number) => {
        setTextInput(filterResult[index]);
        setSelectedIndex(index);
    };

    const highlightText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ?
                        <span key={i} className="highlight">{part}</span> :
                        part
                )}
            </span>
        );
    };

    const filterResult = useMemo(() => {
        return debouncedTextInput ? suggestions.filter((item) =>
            item.toLowerCase().includes(debouncedTextInput.toLowerCase())
        ) : [];
    }, [debouncedTextInput, suggestions]);

    return (
        <div className="input-handler">
            <input
                type="text"
                placeholder="Type here...."
                value={textInput}
                onChange={handleInputChange}
            />
            {loading && textInput && <span>Loading...</span>}
            {filterResult.length > 0 && (
                <div className="res-con">
                    {filterResult.map((item, index) => (
                        <div
                            className={`res ${index === selectedIndex ? "selected" : ""}`}
                            key={index}
                            onClick={() => handleSuggestionClick(index)}
                        >
                            {highlightText(item, debouncedTextInput)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InputBox;
