import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './style.js';

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Food', value: 'food'},
    {label: 'Payroll', value: 'payroll'},
    {label: 'Transport', value: 'transport'},
    {label: 'Apparel', value: 'apparel'},
    {label: 'Entertainment', value: 'entertainment'},
    {label: 'Other', value: 'other'},

  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.picker}
    />
  );
}