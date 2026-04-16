export default function NumberDisplay() {
  return (
    <div id="NumberDisplayOuter" className="max-block-48 m-auto items-center p-6 border-2 border-violet-500 rounded-xl">
      <div id="NumberDisplay">0</div>
      <div id="AttributeDisplay" />
      <div>
        <span>EP: </span>
        <span id="EPDisplay" />
      </div>
    </div>
  );
}
