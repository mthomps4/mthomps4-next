import { Post } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

type Data = {
  posts: Post[];
};

const findPosts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { search } = req.query;

  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: search as string,
        mode: "insensitive",
      },
    },
  });

  res.status(200).json({ posts });
};

export default findPosts;
