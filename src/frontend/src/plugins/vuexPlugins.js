import JwtService from "@/services/jwt.service";
import Notifier from "@/plugins/notifier";
import { createResources } from "@/common/heplers";

export default function (store) {
  store.$jwt = JwtService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
}
