"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:3100/profile", {
                    method: "GET",
                    credentials: "include"  
                });

                if (!response.ok) { 
                    router.push("/signin");
                } else {
                    const result = await response.json();
                    setUserData(result.user); 
                }
            } catch (error) {
                console.log("Failed to fetch");
                router.push("/signin"); 
            } finally {
                console.log("finalyy")
                setLoading(false); 
            }
        };

        fetchProfile();
    }, [router]);

    if (loading) {
        return <p>Loading...</p>;  
    }

    if (!userData) {
        return null; 
    }

    return (
        <div>
            <h1>Welcome, {userData?.username}</h1>
            <p>This is your profile page.</p>
        </div>
    );
}

export default Profile;
