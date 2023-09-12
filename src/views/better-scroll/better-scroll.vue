<script lang="ts" setup>
    import { useElementSize } from '@vueuse/core';
    import BetterScroll from 'better-scroll';

    const searchRef = ref(null);
    const { height } = useElementSize(searchRef);

    // 右侧滚动联动左侧
    const styles = computed(() => {
        return `height: calc(100vh - ${height.value}px)`;
    });

    // 选择左侧联动右侧
    function hanldeCateGory(index: number) {
        bsMain.value.scrollTo(0, -contentItemHeight.value[index]);
    }

    // 右侧所有 item
    const contentItem = ref([]);
    // 右侧所有 item 高度
    const contentItemHeight = ref<number[]>([0]);
    // 向上滚动的距离
    const scrollHeight = ref(0);
    const bsCate = ref();
    const bsMain = ref();

    const categoryIndex = computed(() => {
        const index = contentItemHeight.value.findIndex((item, index) => {
            return (
                scrollHeight.value >= item &&
                scrollHeight.value < contentItemHeight.value[index + 1]
            );
        });

        return index > -1 ? index : 0;
    });

    const list = [
        {
            name: '1',
            children: [
                {
                    name: '1-1',
                },
                {
                    name: '1-2',
                },
                {
                    name: '1-3',
                },
                {
                    name: '1-4',
                },
                {
                    name: '1-5',
                },
            ],
        },
        {
            name: '2',
            children: [
                {
                    name: '2-1',
                },
                {
                    name: '2-2',
                },
                {
                    name: '2-3',
                },
                {
                    name: '2-4',
                },
                {
                    name: '2-5',
                },
            ],
        },
        {
            name: '3',
            children: [
                {
                    name: '3-1',
                },
                {
                    name: '3-2',
                },
                {
                    name: '3-3',
                },
                {
                    name: '3-4',
                },
                {
                    name: '3-5',
                },
            ],
        },
    ];

    onMounted(async () => {
        await nextTick();

        bsCate.value = new BetterScroll('.category', {
            click: true,
        });

        bsMain.value = new BetterScroll('.main', {
            click: true,
            probeType: 3,
            bounce: {
                top: false,
            },
        });

        // 监听滚动事件
        bsMain.value.on('scroll', ({ y }: { y: number }) => {
            scrollHeight.value = Math.abs(y);
        });

        let height = 0;
        contentItem.value.forEach((item: any) => {
            contentItemHeight.value.push((height += item.clientHeight));
        });
    });

    // 去搜索
</script>

<template>
    <div class="w-screen h-screen overflow-hidden">
        <div ref="searchRef" class="relative z-20">
            <van-search disabled placeholder="请输入产品名" />
        </div>

        <section class="w-full flex" :style="styles">
            <!-- 左侧分类 -->
            <div class="category">
                <div class="pb-150px">
                    <div
                        v-for="(item, index) in list"
                        :key="index"
                        class="category-item"
                        :class="{ active: index === categoryIndex }"
                        @click="hanldeCateGory(index)"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>

            <!-- 右侧内容 -->
            <main class="main relative">
                <div class="content">
                    <div
                        v-for="(item, index) in list"
                        :key="index"
                        ref="contentItem"
                    >
                        <div class="content-title">{{ item.name }}</div>

                        <div
                            v-for="(product, i) in item.children"
                            :key="i"
                            class="content-main"
                        >
                            <div>{{ product.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="title">
                    {{ list?.[categoryIndex]?.name }}
                </div>
            </main>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .category {
        @apply w-100px h-full bg-[#f6f6f6];

        &-item {
            @apply text-12px p-15px text-[#666];

            &.active {
                @apply bg-[#fff] text-[#333] font-semibold;
            }
        }
    }
    .main {
        @apply flex-1;

        .content {
            @apply pb-550px;
            &-title {
                @apply text-12px text-[#333] font-semibold p-15px sticky top-0 z-10 bg-[#fff];
            }

            &-main {
                @apply text-12px text-[#333] font-semibold p-15px border-b border-[#eee] h-50px;
            }
        }

        .title {
            @apply absolute left-0 right-0 top-0 text-12px text-[#333] font-semibold p-15px z-10 bg-[#fff];
        }
    }
</style>
