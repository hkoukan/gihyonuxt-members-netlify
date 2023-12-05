import type { User, ReturnJSONAuth } from "@/interfaces";

export default defineEventHandler(async (event): Promise<ReturnJSONAuth> => {
  let resultVal = 0;
  let tokenVal = "";
  let loginUser: User | null = null;

  try {
    const body = await readBody(event);
    resultVal = 1;
    if (body.loginID == "bow" && body.password == "wow") {
      tokenVal = "abcsefghijklmn";
      loginUser = {
        id: 1234,
        name: "山本太郎",
        loginId: body.loginID,
        password: "",
      };
    }
  } catch (err) {
    console.log(err);
  }
  return {
    result: resultVal,
    token: tokenVal,
    user: loginUser,
  };
});
