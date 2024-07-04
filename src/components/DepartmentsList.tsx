import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse, IconButton, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import departments from '../Data/departments';

const DepartmentsList = () => {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (department: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department]: !prevOpen[department],
    }));
  };

  const handleSelect = (key: string, isDepartment: boolean, subDepartments?: string[]) => {
    if (isDepartment) {
      const newSelected = { ...selected };
      const selectAll = !selected[key];
      newSelected[key] = selectAll;
      subDepartments?.forEach((subDept) => {
        newSelected[subDept] = selectAll;
      });
      setSelected(newSelected);
    } else {
      const newSelected = { ...selected, [key]: !selected[key] };
      const department = departments.find((dept) => dept.sub_departments.includes(key));
      if (department) {
        const allSelected = department.sub_departments.every((subDept) => newSelected[subDept]);
        newSelected[department.department] = allSelected;
      }
      setSelected(newSelected);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <List>
        {departments.map((dept) => (
          <React.Fragment key={dept.department}>
            <ListItem>
              <Checkbox
                edge="start"
                checked={!!selected[dept.department]}
                tabIndex={-1}
                disableRipple
                onChange={() => handleSelect(dept.department, true, dept.sub_departments)}
              />
              <ListItemText primary={dept.department} />
              <IconButton onClick={() => handleToggle(dept.department)}>
                {open[dept.department] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={open[dept.department]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {dept.sub_departments.map((subDept) => (
                  <ListItem key={subDept} sx={{ pl: 4 }}>
                    <Checkbox
                      edge="start"
                      checked={!!selected[subDept]}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleSelect(subDept, false)}
                    />
                    <ListItemText primary={subDept} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentsList;
