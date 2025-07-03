import "server-only";
import type { Locale } from "./i18n.config";

const dictionaryLoaders = {
  en: () => import("@/lang/en.json").then((module) => module.default),
  "pt-BR": () => import("@/lang/pt-BR.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  const loader = dictionaryLoaders[locale] ?? dictionaryLoaders["pt-BR"];
  return loader();
};
