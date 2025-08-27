import { isLoggedIn } from "../../../../utils/auth";
import { Login } from "../../../../components/Login";
import { PostForm } from "../../../../components/PostForm";
import { getPosts } from "../../../../lib/db/posts";

export default async function UpdatePost({ 
    params
} : { 
    params: Promise<{ 
        urlId: string 
    }>;
}) {
    const loggedIn = await isLoggedIn();
    const p = await params;

    if (!loggedIn) {
        return (
            <main>
                <Login />
            </main>
        );
    } else if (loggedIn) {
        // Fetch the posts from the database
        const dbPosts = await getPosts();        
        // Find the post with the matching urlId
        const initialData = dbPosts.find((post) => post.urlId === p.urlId);

        if (!initialData) {
            // Handle case where post is not found
            return (
                <main className="max-w-4xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                </main>
            );
        }

        return (
            <main className="max-w-4xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Update Post</h1>
                <PostForm initialData={initialData} />
            </main>
        );
    }
}