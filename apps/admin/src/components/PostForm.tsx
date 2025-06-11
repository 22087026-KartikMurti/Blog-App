"use client";

import { useState, useRef } from "react";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import QuillEditor from "./RichTextEditor";
import TurndownService from "turndown";
import sanitize from "sanitize-html";

interface PostFormData {
    id: number;
    title: string;
    category: string;
    description: string;
    content: string;
    imageUrl: string;
    tags: string;
}

interface FormErrors {
    title?: string;
    description?: string;
    category?: string;
    content?: string;
    imageUrl?: string;
    tags?: string;
}

interface PostFormProps {
    initialData?: PostFormData;
}

export function PostForm({ initialData }: PostFormProps) {
    const turndownService = new TurndownService();
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    //error handling needs
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [imageLoadError, setImageLoadError] = useState(false);
    const [showErrorBanner, setShowErrorBanner] = useState(false);

    const [formData, setFormData] = useState<PostFormData>(initialData || {
        id: -1, // default value before the post is created
        title: "",
        category: "",
        description: "",
        content: "",
        imageUrl: "",
        tags: "",
    });

    const sanitizeContent = (html: string) => {
        return sanitize(html, {
            allowedTags: [
                'h1', 'h2', 'h3', 'p',
                'strong', 'em', 'u', 's',
                'ol', 'ul', 'li', 
                'br', 'span', 'div'
            ],
            allowedAttributes: {
                '*': ['style', 'class'],
            },
            disallowedTagsMode: 'discard',
        });
    }

    const validateForm = (): boolean => {
        const errors: FormErrors = {};

        if (!formData.title) {
            errors.title = "Title is required";
        }

        if(!formData.category) {
            errors.category = "Category is required";
        }

        if (!formData.description) {
            errors.description = "Description is required";
        } else if (formData.description.length > 200) {
            errors.description = "Description is too long. Maximum is 200 characters";
        }


        const stripHtml = (html: string) => {
            const div = document.createElement("div");
            div.innerHTML = html;
            return div.textContent || div.innerText || "";
        };

        const sanitizedContent = sanitizeContent(formData.content);
        if (!stripHtml(sanitizedContent).trim()) {
            errors.content = "Content is required";
        }

        if (!formData.imageUrl) {
            errors.imageUrl = "Image URL is required";
        } else if (!isValidImageUrl(formData.imageUrl)) {
            errors.imageUrl = "This is not a valid URL";
        }

        if (!formData.tags) {
            errors.tags = "At least one tag is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if(name === "imageUrl") {
            setImageLoadError(false);
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            setShowErrorBanner(true);
            return;
        }

        setSuccessMessage("");
        setShowErrorBanner(false);
        setIsSaving(true);
        
        try {
            /* 
             *  If initialData is provided, we are updating an existing post
             *  Otherwise, we are creating a new post
             */ 
            const endpoint = initialData?.title
                ? `/api/posts/${initialData.id}`
                : '/api/posts';

            const method = initialData?.title ? "PUT" : "POST";

            // Convert HTML content from the editor to Markdown for storage
            const contentMarkdown = turndownService.turndown(formData.content);
            const updatedFormData = {
                ...formData,
                content: contentMarkdown
            };

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormData),
            });
            if (response.ok) {
                setSuccessMessage("Post updated successfully!");
            } else {
                throw new Error("Failed to save post");
            }
            setIsSaving(false);
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    const isValidImageUrl = (url: string) => /^https?:\/\/.+/.test(url);

    return (
        <>
            <Link href="/">Home</Link>
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {successMessage}
                </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
                {showErrorBanner && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        Please fix the errors before saving
                    </div>
                )}

                <div>
                    <label htmlFor="title" className="block mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                    {formErrors.title && 
                    <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                </div>

                <div>
                    <label htmlFor="category" className="block mb-2">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                    {formErrors.category && 
                    <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                    {formErrors.description && 
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
                </div>

                <div>
                    <p className="block mb-2">
                        Content
                    </p>
                    <QuillEditor
                        value={formData.content}
                        onChange={(value: string) => {
                            setFormData((prev) => ({
                                ...prev,
                                content: value,
                            }));
                        }}
                    />
                    {formErrors.content && 
                    <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
                </div>

                <div>
                    <label htmlFor="imageUrl" className="block mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                    {formErrors.imageUrl && 
                    <p className="text-red-500 text-sm mt-1">{formErrors.imageUrl}</p>}
                    {formData.imageUrl && !formErrors.imageUrl && isValidImageUrl(formData.imageUrl) && (
                        <div className="mt-2">
                            {!imageLoadError ? (
                                <img
                                    data-test-id="image-preview"
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="max-w-xs h-auto"
                                    onError={() => setImageLoadError(true)}
                                />
                            ) : (
                                <div className="text-red-500 mt-2">
                                    Image Preview Failed. Check for correct URL.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="tags" className="block mb-2">
                        Tags
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                    {formErrors.tags && 
                    <p className="text-red-500 text-sm mt-1">{formErrors.tags}</p>}
                </div>

                <Button
                    type="submit"
                    className={`px-6 py-2 rounded ${
                        isSaving
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600' 
                    }`}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </Button>
            </form>
        </>
    )
}