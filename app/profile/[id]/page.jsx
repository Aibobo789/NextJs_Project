"use client"

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation"
import { useState, useEffect,Suspense } from 'react';

const UserProfile = ({params}) => {

    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [userPosts, setUserPost] = useState([]);

    useEffect(()=>{
        const fetchPosts = async ()=> {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUserPost(data);
        };

        if(params?.id) fetchPosts();
    },[params?.id])

    return (
        <Profile 
            name={userName}
            desc = {`Welcome to ${userName}'s personal profile page`}
            data={userPosts}
        />
    )
}

export default function UserProfileBar(){
    return (
        <Suspense>
            <UserProfile />
        </Suspense>
    )
};