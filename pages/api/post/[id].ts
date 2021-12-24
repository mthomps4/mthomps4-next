import { Post } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../util/prisma";

type Data = {
  post: Post | null;
};

const findPost = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  if (!id) {
    return res.status(404).json({ post: null });
  }

  const post = await prisma.post.findUnique({ where: { id: id as string } });
  res.status(200).json({ post });
};

export default findPost;
