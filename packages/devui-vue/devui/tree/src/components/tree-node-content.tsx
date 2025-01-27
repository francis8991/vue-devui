import { ComputedRef, defineComponent, PropType, toRefs } from 'vue';
import { IInnerTreeNode } from '../composables/use-tree-types';
import useTreeNode from '../composables/use-tree-node';

export default defineComponent({
  name: 'DTreeNodeContent',
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { nodeTitleClass, matchContents, highlightCls } = useTreeNode(data as ComputedRef<IInnerTreeNode>);

    return () => {
      return (
        <span class={nodeTitleClass.value}>
          {!data.value?.matchedText && data.value?.label}
          {data.value?.matchedText &&
            matchContents.value.map((item: string, index: number) => (index % 2 === 0 ? item : <span class={highlightCls}>{item}</span>))}
        </span>
      );
    };
  },
});
