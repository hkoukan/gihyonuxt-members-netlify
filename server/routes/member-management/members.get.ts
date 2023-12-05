import type { Member, ReturnJSONMembers } from "@/interfaces";

export default defineEventHandler(async (event): Promise<ReturnJSONMembers> => {
  let memberList: Member[] = [];
  let resultVal: number = 0;
  const storage = useStorage();
  // const memberListStorage = await storage.getItem(
  // throw createError("擬似エラー発生");
  await storage
    .getItem("local:member-management_members")
    .then((response) => {
      memberList = response as Member[];
      resultVal = 1;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    result: resultVal,
    data: memberList,
  };
});
