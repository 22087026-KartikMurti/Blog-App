import { Post } from '@repo/db/data';

interface FilterParams {
  contentOrTitle?: string;
  tag?: string;
  date?: string;
  sort?: string;
  active?: string;
}

export function filterPosts(posts: Post[], params: FilterParams) {
  let filteredPosts = [...posts];
  let filtered = false;

  if(params.contentOrTitle) {
    filtered = true;
    const contentOrTitle = params.contentOrTitle.toLowerCase();
    filteredPosts = filteredPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(contentOrTitle) ||
        post.content.toLowerCase().includes(contentOrTitle)
      );
    });
  }

  if(params.tag) {
    filtered = true;
    const tag = params.tag.toLowerCase();
    filteredPosts = filteredPosts.filter((post) => {
      return post.tags.toLowerCase().includes(tag);
    });
  }

  if(params.date) {
    filtered = true;
    const date = new Date(params.date);
    filteredPosts = filteredPosts.filter((post) => {
      const newDate = new Date(post.date);
      return newDate >= date;
    });
  }

  if(params.active) {
    filtered = true;
    const active = params.active.toLowerCase();
    if(active === 'active') {
      filteredPosts = filteredPosts.filter((post) => post.active);
    } else if(active === 'inactive') {
      filteredPosts = filteredPosts.filter((post) => !post.active);
    }
  }

  if(params.sort) {
    const sort = params.sort;
    if(sort == 'date-asc') {
      filteredPosts = filteredPosts.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    } else if(sort == 'date-desc') {
      filteredPosts = filteredPosts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if(sort == 'title-asc') {
      filteredPosts = filteredPosts.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if(sort == 'title-desc') {
      filteredPosts = filteredPosts.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
    }
  } else {
    filteredPosts = filteredPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  return { filteredPosts, filtered };
}