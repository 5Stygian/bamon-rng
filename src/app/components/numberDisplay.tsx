export default function NumberDisplay() {
  return (
    <div id="NumberDisplayOuter" className="min-w-400 justify-center items-center p-6 border-2 border-violet-500 rounded-xl">
      <div id="NumberDisplay">0</div>
      <div id="AttributeDisplay" />
      <div>
        <span>EP: </span>
        <span id="EPDisplay" />
      </div>
    </div>
  );
}
