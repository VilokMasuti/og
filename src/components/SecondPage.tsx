import{ useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import DepartmentsList from './DepartmentsList';
import { Post } from '../models/Post';

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const columns: GridColDef[] = [
 
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];


  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Second Page
      </Typography>
      <Typography>
        You have successfully entered your details and navigated to this page.
      </Typography>
 
      <DataGrid
        rows={posts}
        columns={columns}
   
        pagination
        loading={loading}
      />
      <DepartmentsList />
    </Box>
  );
};

export default SecondPage;
