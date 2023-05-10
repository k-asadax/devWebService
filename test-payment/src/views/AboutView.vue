<script setup lang=ts>
  import { useConfirmDialog } from "@/composables/useConfirmDialog";
  import ConfirmDialog from "@/components/ConfirmDialog.vue";

  const { confirm } = useConfirmDialog({
    title: "Test payment by credit card.",
    text: "(EMV-3DS_2.0)",
  });

  const handleDialog = async () => {
    if (await confirm()) {
      console.log("okがクリックされました");
    } else {
      console.log("cancelがクリックされました");
    }
  };
</script>

<template>
  <div class="about">
    <button class="btnexectest" @click="handleDialog">test payment</button>
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.btnexectest {
    font-size: 14px;
    margin: 7px 0;
    cursor: pointer;
    color: #f2f8f5;
    background-color: #1f980a;
    height: 36px;
    min-width: 88px;
    text-align: center;
    display: inline-block;
    border: 1px solid #dedede;
    border-radius: 12px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.12);
    -webkit-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    -o-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);

  }
</style>
