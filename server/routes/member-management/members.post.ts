import type { Member, ReturnJSONMembers } from "@/interfaces";

export default defineEventHandler(async (event): Promise<ReturnJSONMembers> => {
  const body = await readBody(event);
  const member = body as Member;
  let memberList: Member[] = [];
  const storage = useStorage();
  let resultVal: number = 0;

  const memberListStorage = await storage.getItem(
    "local:member-management_members"
  );
  if (memberListStorage) {
    memberList = memberListStorage as Member[];
  }
  memberList.push(member);
  await storage
    .setItem("local:member-management_members", memberList)
    .then(() => {
      resultVal = 1;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    result: resultVal,
    data: [member],
  };
});
