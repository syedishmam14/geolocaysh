import React from 'react';

interface DropdownProps {
    setCategory: any;
    category: string;
    data: any;
}

function Dropdown({setCategory, category, data}:DropdownProps) {

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategory(event.target.value);
    }

    return (
        <div className="Dropdown">
            <select value={category} onChange={handleChange} name="sports-categories" id="sports">
                <option value="water">Water</option>
                <option value="snow">Snow</option>
                <option value="field">Field</option>
                <option value="racing">Racing</option>
            </select>
            <div>
                <p>{data[0].attributes.name}</p>
                <p>{data[1].attributes.name}</p>
                <p>{data[2].attributes.name}</p>
                <p>{data[3].attributes.name}</p>
            </div>
        </div>
    );
}

export default Dropdown;