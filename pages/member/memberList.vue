<script setup lang="ts">
import type { Member } from "@/interfaces";
definePageMeta({
    layout: "member",
    middleware: ["loggedin-check"],
})

const { data, pending, error } = useLazyFetch("/member-management/members");

const memberList = computed(
    (): Member[] => {
        let returnList: Member[] = [];
        if (data.value != null) {
            returnList = data.value.data;
        }
        return returnList;
    }
);

const isEmptyList = computed(
    (): boolean => {
        return memberList.value?.length === 0;
    }
);

// const noServerError = computed((): boolean => {
//     let returnVal = false;
//     if (error.value) {
//         returnVal = true;
//     }
//     return returnVal;
// })


</script>

<template>
    <nav id="breadcrumbs">
        <ul>
            <li>
                <NuxtLink :to="{ name: 'index' }">TOP</NuxtLink>
            </li>
            <li>会員リスト</li>
        </ul>
    </nav>
    <section>
        <h2>会員リスト</h2>
        <p>新規登録は<NuxtLink :to="{ name: 'member-memberAdd' }">こちら</NuxtLink>から</p>
        <p v-if="pending">データ取得中</p>
        <template v-else>
            <section v-if="!error">
                <ul>
                    <li v-if="isEmptyList">会員情報は存在しません。</li>
                    <li v-for="member in memberList" :key="member.id">
                        <NuxtLink :to="{ path: `/member/memberDetail/${member.id}` }">
                            IDが{{ member.id }}の{{ member.name }}さん
                        </NuxtLink>
                    </li>
                </ul>
            </section>
            <p v-else>サーバーからデータ処理中に障害が発生しました</p>
        </template>
    </section>
    <p>{{ $route }}</p>
</template>
