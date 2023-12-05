import type { Member, ReturnJSONMembers } from "@/interfaces";

export default defineEventHandler(async (event): Promise<ReturnJSONMembers> => {
  const params = event.context.params;
  const storage = useStorage();
  let resultVal: number = 0;
  const member: Member[] = [];
  // throw createError("擬似エラー発生");

  await storage
    .getItem("local:member-management_members")
    .then((response) => {
      const memberList = response as Member[];
      if (params) {
        const idNo = Number(params!.id);
        const tentativeMember = memberList.find(
          (member: Member): boolean => member.id === idNo
        );
        resultVal = 1;
        if (tentativeMember) {
          member[0] = tentativeMember;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    result: resultVal,
    data: member,
  };
});
