import { superAxios } from "@/lib/superAxios";

export const getFileWebConfig = async () => {
  const res = await (
    await superAxios.useWebApi()
  ).get({
    url: "/FileWebConfig",
  });

  return res.data;
};
export const getFileType = async () => {
  const res = await (
    await superAxios.useWebApi()
  ).get({
    url: "/FileType",
  });

  return res.data;
};

export const getFiles = async (data: any) => {
  const res = await (
    await superAxios.useWebApi()
  ).get({
    url: "/File",
    data,
  });

  return res.data;
};
