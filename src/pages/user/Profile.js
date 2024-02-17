import React, { useEffect, useState, useParams } from 'react';
import { Alert, AppBar, Box, Button, Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import apiService from '../../app/apiService';
import EditIcon from '@mui/icons-material/Edit';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';

function Profile () {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState({username: false, email: false, address: false, phone: false});
    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (params.id) {
            const getUser = async () => {
                setLoading(true);
                try {
                    const res = await apiService.get(`/users/${params.id}`);
                    setUser(res.data.user);
                    setError("");
                } catch (error) {
                    console.log(error);
                    setError(error.message);
                }
                setLoading(false);
            };
            getUser();
        }
    }, [params]);

    const handleEdit = (field) => {
        setEditMode({...editMode, [field]: true});
    };

    const handleSave = async (field, value) => {
        try {
            const res = await apiService.put(`/users/${params.id}`, {[field]: value});
            setUser(res.data.user);
            setEditMode({...editMode, [field]: false});
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    return (
        <Container sx={{ my: 3 }}>
            <Box>
                <AppBar position="static">
                    <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Logo onClick={() => navigate('/')} />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        E-shop
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="h6" color="inherit" component="div">
                        Welcome {user?.username}!
                    </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
                User Profile
            </Typography>
            <Box sx={{ position: "relative", height: 1 }}>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {error ? (
                            <Alert severity="error">{error}</Alert>
                        ) : (
                            <>
                                {user && (
                                    <Box>
                                        {['username', 'email', 'address', 'phone'].map((field) => (
                                            <Box key={field}>
                                                {editMode[field] ? (
                                                    <TextField
                                                        value={user[field]}
                                                        onChange={(e) => setUser({...user, [field]: e.target.value})}
                                                        onBlur={() => handleSave(field, user[field])}
                                                    />
                                                ) : (
                                                    <>
                                                        <Typography variant="h6">{user[field]}</Typography>
                                                        <EditIcon onClick={() => handleEdit(field)}>Edit</EditIcon>
                                                    </>
                                                )}
                                            </Box>
                                        ))}
                                        <Button onClick={() => navigate(`/users/${params.id}/orders`)}>View Orders</Button>
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Profile;