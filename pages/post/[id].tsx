import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from ".prisma/client";
import useSWR from "swr";
import { axiosFetcher } from "../../util/axios";
import { useRouter } from "next/router";

interface Data {
  post: Post;
}

const Posts: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_URL = `/api/post/${id}`;

  const handleOnError = async (e: any) => {
    await setError(e);
    await setLoading(false);
  };

  const handleOnSuccess = async (data: Data) => {
    const { post } = data;
    await setPost(post);
    await setLoading(false);
  };

  useSWR(() => (id ? { url: API_URL } : null), axiosFetcher, {
    onError: handleOnError,
    onSuccess: handleOnSuccess,
  });

  // console.log({ loading, error, posts });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred.</div>;
  if (!post) return <div>Not Found...?!</div>;

  return (
    <div className="">
      <Head>
        <title>Post</title>
        <meta name="description" content={post.description || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="text-blue-500">{post.title}</h1>
        <Image
          alt="post-title-image"
          src={post.coverImage}
          width={80}
          height={100}
        />
      </main>
    </div>
  );
};

export default Posts;
