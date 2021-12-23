import { Post } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../util/prisma";

type Data = {
  post: Post | null;
};

const findPost = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;
  const slugString = slug as string;
  const post = await prisma.post.findUnique({ where: { slug: slugString } });
  res.status(200).json({ post });
};

export default findPost;
