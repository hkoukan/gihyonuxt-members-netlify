<script setup lang="ts">

definePageMeta({
    middleware: ["loggedin-check"]
});
</script>
<template>
    <h1>TOP</h1>
    <nav id="breadcrumbs">
        <ul>
            <li>TOP</li>
        </ul>
    </nav>
    <section>
        <NuxtLink to="/member/memberList">会員管理はこちら</NuxtLink>
        <p>{{ $route }}</p>
    </section>
</template>
