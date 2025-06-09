'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { useState } from "react";

export function FilteredItem({ post }: { post: {
    id: number;
    urlId: string;
    imageUrl: string;
    category: string;
    title: string;
    description: string;
    tags: string;
    date: Date;
    active: boolean;
    likes: number;
    views: number;
}}) {
    const [isActive, setIsActive] = useState(post.active);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggleActive = async () => {
        setIsUpdating(true);
        try {
            const response = await fetch(`/api/posts/${post.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ active: !isActive })
            });

            if (response.ok) {
                setIsActive(!isActive);
            } else {
                console.error("Failed to toggle post status");
            }
        } catch (error) {
            console.error("Error toggling post status:", error);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <article key={post.id} className="mb-6 p-4 border flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
                {post.imageUrl && (
                    <div className="relative h-48 w-full">
                    <Image 
                        src={post.imageUrl} 
                        alt={post.title}
                        fill
                        style={{ objectFit: "cover" }} // to prevent image stretching
                        className="rounded"
                    />
                    </div>
                )}
            </div>
            
            <div className="md:w-3/4">
                <Link href={`/posts/${post.urlId}`}>
                    <h2 className="text-xl font-bold mb-2 hover:text-blue-600">{post.title}</h2>
                </Link>
                <Button
                    className={`px-3 py-1 rounded ${
                        isUpdating
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            :
                        isActive
                            ? 'bg-green-100 text-green-800 hover:bg-green-400' 
                            : 'bg-red-100 text-red-800 hover:bg-red-400'
                    }`}
                    onClick={handleToggleActive}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : isActive ? 'Active' : 'Inactive'}
                </Button>
            
                <p className="text-gray-700 mb-3">
                    {post.description.length > 150 
                        ? `${post.description.substring(0, 150)}...` 
                        : post.description}
                </p>
            
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-sm text-gray-500">
                    Posted on {new Date(post.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short', 
                        year: 'numeric'
                    })}
                    </span>
                    <span className="text-sm text-gray-500">• {post.category}</span>
                    <span className="text-sm text-gray-500">• {post.likes} Likes</span>
                    <span className="text-sm text-gray-500">• {post.views} Views</span>
                </div>
            
                <div className="mb-4">
                    {post.tags.split(',').map((tag, index) => (
                        <span key={index} className="px-3 py-1">
                            #{tag.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    )
}