export type OptionalParameters<Type> = {
  [Property in keyof Type]?: Type[Property];
};
