type Config = Record<string, Record<string, string>>;

export const config: Config = {
  styles: {
    RollButton:
      "block w-24 m-auto my-8 p-4 font-bold border-2 rounded-2xl border-black \
      bg-gradient-to-br from-fuchsia-500 to-violet-500/80",
    NumberDisplay:
      "max-w-xl m-auto p-6 font-bold border-2 rounded-xl border-violet-500 \
      bg-gradient-to-tr from-purple-600 to-violet-800",
  },
};
