import { CrudCollection } from "@/common/heplers";
import rules from "@/common/validator/rules";

const validate = (el, event, collection, detectedRules) => {
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
};

export default {
  bind: function (el, binding, vnode) {
    const collection = vnode.context.$data.errors;
    const detectedRules = binding.value;

    el.addEventListener("input", (event) => {
      validate(el, event, collection, detectedRules);
    });

    el.addEventListener("focusout", (event) => {
      validate(el, event, collection, detectedRules);
    });
  },
};
