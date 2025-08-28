"use client"

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const PostForm = dynamic(() => import("./PostForm").then(mod => ({
    default: mod.PostForm 
})), {
    ssr: false,
    loading: () => <p>Loading Form...</p>
});

export function PostFormWrapper({ initialData }: any) {
    useEffect(() => {
        // Perform any necessary side effects here
        const key = `post-${initialData?.id}`;
        if(!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, 'true');
            window.location.reload();
        }

        const handleUnload = () => {
            sessionStorage.removeItem(key);
        }

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            sessionStorage.removeItem(key);
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [initialData?.id]);

    return <PostForm initialData={initialData} />;
}