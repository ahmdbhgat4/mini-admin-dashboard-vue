<script setup>
import Sidebar from '@/components/Sidebar.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
</script>

<template>
    <div id="shell" class="shell">
        <Sidebar />

        <div>
            <MainHeader />

            <main>
                <RouterView />
            </main>

            <MainFooter />
        </div>
    </div>
</template>
