import { Post } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

type Data = {
  posts: Post[];
};

const findPosts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { search } = req.body;
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  prisma.$disconnect;
  res.status(200).json({ posts });
};

export default findPosts;
