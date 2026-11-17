import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';

import { Button, FormControl, FormLabel, TextField, Grid, Stack, Card, Box } from '@mui/material';

export default function LoginForm() {
    const [userEmail, setUserEmail] = useState('default@email.com');
    const [userPassword, setUserPassword] = useState('Supercalafradulisticgetsmealidotious');
    const [submitResult, setSubmitResult] = useState('');

    const {currentUser, handleUpdateUser} = useUserContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userPassword.length < 5) {
            setSubmitResult('Pasword to be >5 characters long.');
        }
        else if (userPassword === userEmail) {
            setSubmitResult('Password not to match email address.');
        }
        else {
            setSubmitResult(`Welcome ${userEmail}`);
            handleUpdateUser({email: userEmail});
        }
    };
    if (currentUser.email) {
        return (
          <>
            <p>Welcome {currentUser.email}</p>
            <Button type="submit" onClick={() => handleUpdateUser({})}>
              Log Out
            </Button>
          </>
        );
    }
    else {
        return (
          <Card
            className="LoginForm componentBox"
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "450px",
              alignSelf: "center",
              mx: "auto",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2, alignSelf: "center", }}
            >
              <FormControl className="formRow">
                <FormLabel >
                  Email Address:
                  <TextField
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    fullWidth
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </FormLabel>
              </FormControl>
              <FormControl className="formRow">
                <FormLabel>
                  Password:
                  <TextField
                    type="password"
                    name="password"
                    placeholder="your password"
                    required
                    fullWidth
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </FormLabel>
              </FormControl>
              <Button type="submit" onClick={handleSubmit}>
                Log In
              </Button>
            </Box>
          </Card>
        );
    }
}