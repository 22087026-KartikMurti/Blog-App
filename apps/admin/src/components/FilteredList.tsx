'use client';

import { useState } from 'react';
import { FilteredItem } from '../components/FilteredItem';
import { Post } from "@repo/db/data";

export function FilteredList({
    filtered,
    filteredPosts,
    postsPerPage = 3,
} : {
    filtered: boolean;
    filteredPosts: Post[];
    postsPerPage?: number;
}) {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Pagination calculations
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Pagination handlers
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    // Reset to first page when filtered posts change
    if (filteredPosts.length > 0 && indexOfFirstPost >= filteredPosts.length) {
        setCurrentPage(1);
    }

    // Pagination UI component
    const PaginationControls = () => {
        if (totalPages <= 1) return null;
        
        return (
            <div className="flex items-center justify-between py-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-sm rounded ${
                        currentPage === 1
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    Previous
                </button>
                
                <div className="hidden sm:flex space-x-1">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={`w-8 h-8 text-sm rounded ${
                                currentPage === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-sm rounded ${
                        currentPage === totalPages
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    Next
                </button>
            </div>
        );
    };

    if(filtered) {
        return (
            <>
                <div className="w-full">
                    {filteredPosts.length > 0 && currentPosts.map((post) => (
                        <FilteredItem key={post.id} post={post} />
                    ))}
                </div>
                <PaginationControls />
            </>
        );
    } else {
        return (
            <>
                <div>
                    {currentPosts.map((post) => (
                        <FilteredItem key={post.id} post={post} />
                    ))}
                </div>
                <PaginationControls />
            </>
        );
    }
};