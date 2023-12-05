import type { User } from "@/interfaces";

export default defineNuxtRouteMiddleware((to, from) => {
  const loginTokenCookie = useCookie<string | null>("loginToken");
  const loginUserCookie = useCookie<User | null>("loginUser");
  if (!loginTokenCookie.value || !loginUserCookie.value) {
    return navigateTo("/login");
  } else {
    return;
  }
});
