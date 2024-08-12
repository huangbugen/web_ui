import { superAxios } from "@/lib/superAxios";

export const getSectionInfo = async (sid: string) => {
  const res = await (
    await superAxios.useWebApi("BBS")
  ).get({
    url: `/api/Section?sectionId=${sid}`,
  });
  return res.data;
};

export const getPostType = async (sid: string) => {
  const res = await (
    await superAxios.useWebApi("BBS")
  ).get({
    url: `/api/Post/PostType?sectionId=${sid}`,
  });
  return res.data;
};

export const AddPost = async (data: any) => {
  const res = await (
    await superAxios.useWebApi("BBS")
  ).post({
    url: `/api/Post`,
    data,
  });

  return res.data;
};
