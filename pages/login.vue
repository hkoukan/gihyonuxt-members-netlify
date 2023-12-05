<script setup lang="ts">
import type { User } from "@/interfaces";

definePageMeta({
  layout: "loggedout"
});

const loginId = ref("");
const password = ref("");
const pending = ref(false);
const noServerError = ref(true);
const authFailed = ref(false);

const onLoginButtonClick = async (): Promise<void> => {
  pending.value = true;
  authFailed.value = false;
  noServerError.value = true;
  const { data, error } = await useFetch("/user-management/auth",
    {
      method: "POST",
      body: {
        loginID: loginId.value,
        password: password.value,
      }
    }
  );
  if (!error.value && data.value && data.value.result == 1) {
    if (data.value.token) {
      const loginUserCookie = useCookie<User | null>("loginUser");
      loginUserCookie.value = data.value.user;
      const loginTokenCookie = useCookie<string | null>("loginToken");
      loginTokenCookie.value = data.value.token;
      await navigateTo("/");
    } else {
      pending.value = false;
      authFailed.value = true;
    }
  } else {
    pending.value = false;
    noServerError.value = false;
  }
}
</script>

<template>
  <h1>ログイン</h1>
  <p v-if="pending">ログイン中・・・</p>
  <template v-else>
    <p v-if="authFailed">ログインIDまたはパスワードが違います</p>
    <p v-if="noServerError">IDとパスワードを入力してログインしてください。</p>
    <p v-else>サーバ処理中に障害が発生しました。もう一度ログインを行なってください。</p>
    <form @submit.prevent="onLoginButtonClick">
      <label>ID<input type="text" v-model="loginId" required></label>
      <label>パスワード<input type="password" v-model="password" required></label>
      <button>ログイン</button>
    </form>
  </template>
</template>
