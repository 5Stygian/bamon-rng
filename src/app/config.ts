export const config = {
  development: {
    // NOTE: do not push to prod with this set to true
    enableCalculateEP: false,
  },
  styles: {
    RollButton:
      "block w-36 m-auto my-8 p-4 font-bold border-2 rounded-2xl border-black \
      bg-gradient-to-br from-fuchsia-500 to-violet-500/80 z-[-1] ease-[cubic-bezier(0.06, 0.98, 0.41, 0.93)] \
      duration-400 hover:cursor-pointer hover:transition-all hover:hue-rotate-30 \
      hover:scale-120 hover:rotate-[2deg] hover:brightness-110",
    NumberDisplay:
      "max-w-[5.5em] m-auto p-4 font-mono font-bold border-8 rounded-[30px] border-violet-500 \
      bg-transparent text-[5.5em] text-center \
      hover:cursor-default",
    EPContainer:
      "max-w-[10em] mt-4 m-auto font-mono font-bold border-4 rounded-[30px] border-violet-500 \
      bg-transparent text-[1em] text-center opacity-0 \
      duration-400 hover:cursor-default ease-[cubic-bezier(0.06, 0.98, 0.41, 0.93)]",
    AttributeDisplay:
      "max-w-xl m-auto p-6 font-bold border-2 rounded-xl border-violet-500 \
      bg-gradient-to-tr from-purple-600 to-violet-800 \
      hover:cursor-default",
    TopBar: {
      Box: "py-auto h-12",
      Title: "w-fit mx-4 font-extrabold text-4xl",
    },
  },
};
