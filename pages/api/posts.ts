import { Post, Prisma } from ".prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../util/prisma";

type Data = {
  posts: Post[];
  pageInfo: {
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
    totalPages: number;
  };
};

const findPosts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { search, page = "1", limit = "5" } = req.query;

  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(limit as string);

  const where: Prisma.PostWhereInput = {
    title: {
      contains: search as string,
      mode: "insensitive",
    },
  };

  const orderBy: Prisma.Enumerable<Prisma.PostOrderByWithRelationInput> = {
    publishedOn: "desc",
  };

  const take = limitNumber;
  const skip = pageNumber * take;

  const posts = await prisma.post.findMany({
    where,
    orderBy,
    take,
    skip,
  });

  const count = await prisma.post.count({
    where,
    orderBy,
  });

  const totalPages = Math.round(count / take);
  const hasNext = pageNumber < totalPages;
  const hasPrev = pageNumber > 1;
  const nextPage = hasNext ? pageNumber + 1 : null;
  const prevPage = hasPrev ? pageNumber - 1 : null;

  const pageInfo = {
    totalPages,
    hasNext,
    nextPage,
    hasPrev,
    prevPage,
  };

  res.status(200).json({ posts, pageInfo });
};

export default findPosts;
