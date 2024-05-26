

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Student() {

  const[name,setName] = React.useState('Isindu');
  const[address,setAddress] = React.useState('Sri Lanka');
  const[students,setStudents] = React.useState([]);



const handleClick = (e) => {
  e.preventDefault();
  const stu = {name,address};
  console.log(stu);

  fetch('http://localhost:8080/student/add',{
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(stu)
  }).then(
    () => {
      console.log('New Student Added');
}
  )
}

React.useEffect(() => {
  fetch('http://localhost:8080/student/getAll')
  .then(res=>res.json())
  .then((result)=>{
    setStudents(result);
  })
}, []);


  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
          mt: 4,
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Student Registration
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="student-name"
              label="Student Name" 
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="student-address"
              label="Student Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Submit
            </Button>
          </Grid>
        </Grid><br/><br/><br/>

        <Typography variant="h4" component="h1" gutterBottom>
          Students
        </Typography>
        
          
            {students.map((student) => (
              <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
              id:{student.id}<br/>
              Name:{student.name}<br/>
              Address:{student.address}


              </Paper>

            ))}
          

        
         

      </Box>
    </Container>
  );
}
