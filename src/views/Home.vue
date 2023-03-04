<template>
    <section class="container-md mx-auto">
        <div class="view d-flex justify-content-center align-items-center">
            <h1>歡迎來到 Omnipotent</h1>
            <img src="@/assets/images/cover_resized.png" alt="首頁封面圖片" class="img-fluid mt-3 cover" />
        </div>
    </section>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
    computed: {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.container-md {
    height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
    .view {
        flex-grow: 1;
        flex-direction: column;

        .cover {
            border-radius: 1rem;
        }
    }
}
</style>
