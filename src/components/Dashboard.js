import React, { useState } from 'react';
import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth();
    const history = useHistory()

    async function handlelogout() {
        setError("");
        try {
            await logout();
            history.pushState('/login')
        } catch (error) {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && alert(error)}
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>

                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handlelogout}>
                    Log Out
                </Button>
            </div>
        </>
    )
}
