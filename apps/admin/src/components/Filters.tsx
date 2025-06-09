"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Filters({
    params, 
}: {
    params: {
        contentOrTitle?: string;
        tag?: string;
        date?: string;
        sort?: string;
        active?: string;
    };
}) {   
    const router = useRouter();
    const [filters, setFilters] = useState({
        contentOrTitle: params.contentOrTitle || '',
        tag: params.tag || '',
        date: params.date || '',
        sort: params.sort || 'date-desc',
        active: params.active || '',
    });

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            contentOrTitle: params.contentOrTitle || '',
            tag: params.tag || '',
            date: params.date || '',
            sort: params.sort || 'date-desc',
            active: params.active || '',
        }));
    }, [params]);
    
    const handleFilterSearch = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
            const { name, value } = event.target;
            const newFilters = { ...filters, [name]: value };
            setFilters(newFilters);
            updateUrl(newFilters);
    };

    const updateUrl = (newFilters: typeof filters) => {
        const queryString = new URLSearchParams(newFilters).toString();
        router.push(`?${queryString}`);
    };

    return (
        <form action="#" method="GET" className="mb-6 p-4 border rounded-lg bg-gray-50 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-2">
                    <label htmlFor="content-filter" className="block mb-1">Filter by Content:</label>
                    <input
                        type="text"
                        id="content-filter"
                        name="contentOrTitle"
                        value={filters.contentOrTitle}
                        onChange={handleFilterSearch}
                        placeholder="Search in title or content..."
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="tag-filter" className="block mb-1">Filter by Tag:</label>
                    <input
                        type="text"
                        id="tag-filter"
                        name="tag"
                        value={filters.tag}
                        onChange={handleFilterSearch}
                        placeholder="Search by tag..."
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="date-filter" className="block mb-1">Filter by Date Created:</label>
                    <input
                        type="date"
                        id="date-filter"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterSearch}
                        placeholder="DD/MM/YYYY"
                        className="w-full border p-2 rounded"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-2">
                    <label htmlFor="active-filter" className="block mb-1">Post Status:</label>
                    <select
                        id="active-filter"
                        name="active"
                        value={filters.active || ''}
                        onChange={handleFilterSearch}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">All Posts</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="mb-2">
                    <label htmlFor="sort-select" className="block mb-1">Sort By:</label>
                    <select
                        id="sort-select"
                        name="sort"
                        value={filters.sort || 'date-desc'}
                        onChange={handleFilterSearch}
                        className="border p-2 rounded"
                    >
                        <option value="title-asc">Title (A-Z)</option>
                        <option value="title-desc">Title (Z-A)</option>
                        <option value="date-asc">Date (Oldest first)</option>
                        <option value="date-desc">Date (Newest first)</option>
                    </select>
                </div>
            </div>
        </form>
    );
}

export default Filters;