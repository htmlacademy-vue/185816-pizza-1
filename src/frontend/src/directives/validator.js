import { CrudCollection } from "@/common/heplers";
import rules from "@/common/validator/rules";

export default {
  bind: function (el, binding, vnode) {
    el.addEventListener("input", (event) => {
      const collection = vnode.context.$data.errors;
      const detectedRules = binding.value;

      for (const ruleItem of detectedRules) {
        const id = el.getAttribute("name") + "_" + ruleItem;

        if (!rules[ruleItem].rule(event.target.value)) {
          const index = CrudCollection.getIndexByID(collection, id);

          if (index === -1) {
            CrudCollection.add(collection, {
              id,
              message: rules[ruleItem].message,
            });
          } else {
            CrudCollection.updateByID(collection, id, {
              id,
              message: rules[ruleItem].message,
            });
          }
        } else {
          CrudCollection.deleteByID(collection, id);
        }
      }
    });
  },
};
