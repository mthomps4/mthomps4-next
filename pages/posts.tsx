import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from ".prisma/client";

const Posts: NextPage = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const API_URL = "/api/posts";

  useEffect(() => {
    const params = {
      search,
    };

    const fetchData = () => {
      axios
        .post(API_URL, params)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });

      setPosts(data);
      setError(err);
      setloading(false);
    };

    fetchData();
  }, [search]);

  if (error) return <div>An error occurred.</div>;
  if (loading) return <div>Loading ...</div>;
  if (!posts) return <div>None Found...</div>;

  return (
    <div className="">
      <Head>
        <title>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="text-blue-500">Posts</h1>
        <input
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.title}</p>
              <Image
                src={post.coverImage}
                alt="post image"
                loading="eager"
                priority={true}
                width={100}
                height={100}
                className="w-32 h-32 border-4 border-blue-400 drop-shadow-md"
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Posts;
