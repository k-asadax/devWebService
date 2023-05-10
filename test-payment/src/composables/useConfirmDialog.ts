import { ref } from "vue";

type DialogText = {
  title?: string;
  text?: string;
  ok?: string;
  cancel?: string;
};

const isOpen = ref<boolean>(false);

const dialogText = ref<DialogText>({
  title: "title",
  text: "text。",
  ok: "OK",
  cancel: "Cancel",
});

let _resolve: (value: boolean | PromiseLike<boolean>) => void;

export function useConfirmDialog(props: DialogText = {}) {
  if (props.title) dialogText.value.title = props.title;
  if (props.text) dialogText.value.text = props.text;
  if (props.ok) dialogText.value.ok = props.ok;
  if (props.cancel) dialogText.value.cancel = props.cancel;

  const confirm = () => {
    isOpen.value = true;
    return new Promise<boolean>((resolve) => {
      _resolve = resolve;
    });
  };

  const ok = () => {
    isOpen.value = false;
    _resolve(true);
  };

  const cancel = () => {
    isOpen.value = false;
    _resolve(false);
  };

  const close = () => {
    isOpen.value = false;
  };

  return {
    confirm,
    ok,
    cancel,
    close,
    isOpen,
    dialogText,
  };
}