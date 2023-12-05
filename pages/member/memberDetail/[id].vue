<script setup lang="ts">
import type { Member } from "@/interfaces";
definePageMeta({
    layout: "member",
    middleware: ["loggedin-check"],
})

const route = useRoute();

const { data, pending, error } = useLazyFetch(
    `/member-management/members/${route.params.id}`,
    // {
    //     query: { id: route.params.id }
    // }
);
// const { data: member, pending } = useLazyAsyncData(
//     (): Promise<any> => {
//         const endPointUrl = "/api/getOneMemberInfo";
//         const params: {
//             id: string
//         } = {
//             id: typeof route.params.id === 'string' ? route.params.id : ''
//         };
//         const queryParams = new URLSearchParams(params);
//         const urlFull = `${endPointUrl}?${queryParams}`;
//         return $fetch(urlFull);

//     }
// );

const member = computed(
    (): Member | undefined => {
        return data.value?.data[0];
    }
)


const localNote = computed((): string => {
    let localNote = "--"
    if (member.value != undefined && member.value.note != undefined) {
        localNote = member.value.note;
    }
    return localNote;
})
</script>

<template>
    <h1>
        会員管理
    </h1>
    <nav>
        <ul>
            <li>
                <NuxtLink to="/">TOP</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/member/memberList">会員リスト</NuxtLink>
            </li>
            <li>会員詳細情報</li>
        </ul>
    </nav>
    <section>
        <h2>会員詳細情報</h2>
        <p v-if="pending">データ取得中</p>
        <template v-else>
            <template v-if="!error">
                <p v-if="!member">指定された会員情報は存在しません。</p>
                <dl v-else>
                    <dt>ID</dt>
                    <dd>{{ member?.id }}</dd>
                    <dt>名前</dt>
                    <dd>{{ member?.name }}</dd>
                    <dt>メールアドレス</dt>
                    <dd>{{ member?.email }}</dd>
                    <dt>保有ポイント</dt>
                    <dd>{{ member?.points }}</dd>
                    <dt>備考</dt>
                    <dd>{{ localNote }}</dd>
                </dl>
            </template>
            <p v-else>サーバからデータ取得中に障害が発生しました</p>
        </template>
    </section>
    <p>{{ $route.params.id }}</p>
</template>
