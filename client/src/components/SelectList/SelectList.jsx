import { InputLabel, Select, OutlinedInput, MenuItem } from "@mui/material";

function SelectList({ inputType, inputid, onchange, list }) {

    return (
        <div style={{ marginBottom: '10px' }}>
            <InputLabel id={inputid}>{inputType}</InputLabel>
            <Select labelId={inputid} onChange={onchange} input={<OutlinedInput label={inputType} sx={{ width: '100%' }} />}>
                {list.map((element) => (
                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                ))}
            </Select>
        </div>
    )
}

export default SelectList;