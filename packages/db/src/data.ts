export type Post = {
  id: number;
  urlId: string;
  title: string;
  content: string;
  description: string;
  imageUrl: string;
  date: Date;
  category: string;
  views: number;
  likes: number;
  tags: string;
  active: boolean;
};

export type Comment = {
  commentId: number;
  postId: number;
  comment: string;
};

export type Reply = {
  replyId: number;
  commentId: number;
  reply: string;
}

const content = `
  # Title 1

  Illo **sint voluptas**. Error voluptates culpa eligendi. 
  Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
  Sed exercitationem placeat consectetur nulla deserunt vel 
  iusto corrupti dicta laboris incididunt.

  ## Subtitle 1

  Illo sint *voluptas*. Error voluptates culpa eligendi. 
  Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
  Sed exercitationem placeat consectetur nulla deserunt vel 
  iusto corrupti dicta laboris incididunt.
`;

const description = `Illo sint voluptas. Error voluptates culpa eligendi. 
Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
Sed exercitationem placeat consectetur nulla deserunt vel 
iusto corrupti dicta laboris incididunt.`;

const commentContent = `Illo sint voluptas. Error voluptates culpa eligendi.`;

const replyContent = `Illo sint voluptas. Error voluptates culpa eligendi.`;

export const posts: Post[] = [
  {
    id: 1,
    title: "Boost your conversion rate",
    urlId: "boost-your-conversion-rate",
    description,
    content: content + " ... post1",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80",
    date: new Date("Apr 18, 2022"),
    category: "Node",
    tags: "Back-End,Databases",
    views: 320,
    likes: 3,
    active: true,
  },
  {
    id: 2,
    title: "Better front ends with Fatboy Slim",
    urlId: "better-front-ends-with-fatboy-slim",
    description: `Illo sint voluptas. Error voluptates culpa eligendi. 
       Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
       Sed exercitationem placeat consectetur nulla deserunt vel 
       iusto corrupti dicta laboris incididunt.`,
    content: content + " ... post2",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661342428515-5ca8cee4385a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3",
    date: new Date("Mar 16, 2020"),
    category: "React",
    tags: "Front-End,Optimisation",
    views: 10,
    likes: 1,
    active: true,
  },
  {
    id: 3,
    title: "No front end framework is the best",
    urlId: "no-front-end-framework-is-the-best",
    description: `Illo sint voluptas. Error voluptates culpa eligendi. 
       Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
       Sed exercitationem placeat consectetur nulla deserunt vel 
       iusto corrupti dicta laboris incididunt.`,
    content: content + " ... post3",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661517706036-a48d5fc8f2f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    date: new Date("Dec 16, 2024"),
    category: "React",
    tags: "Front-End,Dev Tools",
    views: 22,
    likes: 2,
    active: true,
  },
  {
    id: 4,
    title: "Visual Basic is the future",
    urlId: "visual-basic-is-the-future",
    description: `Illo sint voluptas. Error voluptates culpa eligendi. 
       Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. 
       Sed exercitationem placeat consectetur nulla deserunt vel 
       iusto corrupti dicta laboris incididunt.`,
    content: content + " ... post4",
    imageUrl: "https://m.media-amazon.com/images/I/51NqEfmmBTL.jpg",
    date: new Date("Dec 16, 2012"),
    category: "React",
    tags: "Programming,Mainframes",
    views: 22,
    likes: 1,
    active: false,
  },
  {
    id: 5,
    title: "Fifth post",
    urlId: "fifth-post",
    description: `Illo sint voluptas. Error voluptates culpa eligendi.`,
    content: content + " ... post5",
    imageUrl: "https://m.media-amazon.com/images/I/51NqEfmmBTL.jpg",
    date: new Date("Dec 16, 2013"),
    category: "Random",
    tags: "Random",
    views: 0,
    likes: 0,
    active: true,
  },
];

export const comments: Comment[] = [
  {
    commentId: 1,
    postId: 1,
    comment: commentContent + " ... comment1",
  },
  {
    commentId: 2,
    postId: 1,
    comment: commentContent + " ... comment2",
  },
  {
    commentId: 3,
    postId: 2,
    comment: commentContent + " ... comment3",
  },
  {
    commentId: 4,
    postId: 3,
    comment: commentContent + " ... comment4",
  },
];

export const replies: Reply[] = [
  {
    replyId: 1,
    commentId: 1,
    reply: replyContent + " ...reply 1",
  },
  {
    replyId: 2,
    commentId: 2,
    reply: replyContent + " ...reply 2",
  },
  {
    replyId: 3,
    commentId: 2,
    reply: replyContent + " ...reply 2.1",
  },
  {
    replyId: 4,
    commentId: 3,
    reply: replyContent + " ...reply 3",
  },
];
