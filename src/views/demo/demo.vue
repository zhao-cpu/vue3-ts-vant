<template>
    <div>demo</div>
</template>

<script lang="ts" setup>
    import CommonServices from '@/services/common';

    async function getDict() {
        const res = await CommonServices.dict('stage');
        console.log(res);
    }
    getDict();
</script>
