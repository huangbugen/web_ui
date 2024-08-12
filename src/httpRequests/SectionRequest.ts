import { superAxios } from "@/lib/superAxios";

export const getAreaInfo = async () => {
  const res = await (
    await superAxios.useWebApi("BBS")
  ).get({
    url: "/api/Area?pageIndex=1&pageSize=30",
  });

  return res.data;
};
