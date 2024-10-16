import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import SelectList from '../SelectList/SelectList';
import { useState } from 'react';

export default function RangeDatePicker({ startDate, onStartDateChange, onTypeChange }) {
    const [typeS, setTypeS] = useState('');
    const typeList = [
        {
            id: 'Anual',
            name: 'Anual'
        },
        {
            id: 'Puntual',
            name: 'Puntual'
        }
    ]
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>

                <DatePicker
                    label="Fecha de inicio"
                    value={startDate}
                    onChange={(newValue) => onStartDateChange(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: '50%', marginTop: '7%' }}
                />
                <SelectList inputType='Tipo' inputid='type' onchange={onTypeChange} list={typeList} value={typeS} />
            </div>
        </LocalizationProvider >
    );
}

