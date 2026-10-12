import {
  QuickExplorerIcon,
  QuickIEIcon,
  QuickWMPIcon,
  PaintIcon,
  StartLogo,
  TrayNetworkIcon,
  TrayVolumeIcon,
} from "./Win7TaskbarIcons";

export default function Taskbar({ clockTime, clockDate }) {
  return (
    <div className="taskbar">
      <div className="taskbar-start-tooltip" data-tooltip="Start">
        <div className="taskbar-start-orb">
          <StartLogo />
        </div>
      </div>
      <div className="taskbar-sep-v" />
      <div className="taskbar-quicklaunch">
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          data-tooltip="Internet Explorer"
        >
          <QuickIEIcon />
        </button>
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          data-tooltip="Windows Media Player"
        >
          <QuickWMPIcon />
        </button>
        <button
          className="taskbar-window-chip taskbar-window-chip--active"
          tabIndex={-1}
          data-tooltip="Loago Moremi - File Explorer"
        >
          <QuickExplorerIcon />
        </button>
        <button
          className="taskbar-ql-btn"
          tabIndex={-1}
          data-tooltip="Microsoft Paint"
        >
          <PaintIcon />
        </button>
      </div>
      <div className="taskbar-sep-v" />
      <div style={{ flex: 1 }} />
      <div className="taskbar-sep-v" />
      <div className="taskbar-tray">
        <span className="taskbar-tray-text">ENG</span>
        <span data-tooltip="Volume">
          <TrayVolumeIcon />
        </span>
        <TrayNetworkIcon />
        <div className="taskbar-sep-v" />
        <div className="taskbar-clock">
          <span>{clockTime}</span>
          <span>{clockDate}</span>
        </div>
      </div>
    </div>
  );
}
