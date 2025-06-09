import { FilteredItem } from '../components/FilteredItem';
import { Post } from "@repo/db/data";

export function FilteredList({filtered,
    filteredPosts,
} : {
    filtered: boolean;
    filteredPosts: Post[];
}) {
    if(filtered) {
        return (
            <div className="w-full">
                {filtered && filteredPosts.length > 0 && filteredPosts.map((post) => (
                    <FilteredItem key={post.id} post={post} />
                ))}
            </div>
        );
    } else {
        return (
            <div>
                {!filtered && filteredPosts.map((post) => (
                    <FilteredItem key={post.id} post={post} />
                ))}
            </div>
        );
    }
};