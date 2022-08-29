import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api.service";

export const createResources = (notifier) => {
  return {
    [resources.USERS]: new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.PIZZA]: new CrudApiService(resources.PIZZA, notifier),
    [resources.DOUGHS]: new ReadOnlyApiService(resources.DOUGHS, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
  };
};
