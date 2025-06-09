import { isLoggedIn } from "../../../utils/auth";
import { Login } from "../../../components/Login";
import { PostForm } from "../../../components/PostForm";

export default async function CreatePost() {
    const loggedIn = await isLoggedIn();

    if (!loggedIn) {
        return (
            <main>
                <Login />
            </main>
        );
    } else if (loggedIn) {
        return (
            <main className="max-w-4xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Create Post</h1>
                <PostForm />
            </main>
        );
    }
}