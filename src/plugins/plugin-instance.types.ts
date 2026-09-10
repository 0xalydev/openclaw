/** Disposal and admission shared by instance resources and registry handles. */
export type PluginInstanceLifecycle = {
  readonly signal: AbortSignal;
  onDispose: (dispose: () => void | Promise<void>) => () => void;
};

export type PluginInstanceAdmission = {
  readonly lifecycle: PluginInstanceLifecycle;
  run<T>(run: () => T): T;
};

/** Known disposal faults are reported outcomes, never new-call admission failures. */
export type PluginInstanceDisposalResult = { errors: readonly unknown[] };

/** A host-owned logical consumer retains only its exact instance's admitted operations. */
export type PluginInstanceConsumer = {
  wrap<T>(value: T): T;
  run<T>(run: () => T): T;
  close(cleanup: () => void | Promise<void>): Promise<void>;
  release(): void;
};

/** Exact call token and release operation owned by its PluginInstance. */
export type PluginInstanceCallLease = {
  token: object;
  release: () => void | Promise<unknown>;
};

/** An iterator keeps the admission that owns its pending protocol operations. */
export type PluginIteratorAdmission = {
  readonly done: boolean;
  readonly active: boolean;
  invoke: <T>(run: () => T) => T;
  close: () => void;
  call: (key: PropertyKey, method: Function | undefined, args: unknown[]) => Promise<unknown>;
};
