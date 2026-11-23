#!/usr/bin/env python3
"""Generates the three deployment diagrams in assets/ (SVG, no dependencies).
Run from this folder: python3 make-diagrams.py"""
from pathlib import Path

FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
INK, MUTED, TUNNEL = "#1f2937", "#6b7280", "#2563eb"


class Svg:
    def __init__(self, w, h):
        self.w, self.h, self.parts = w, h, []

    def node(self, x, y, w, h, stereotype, title, fill="#f8fafc", stroke="#475569"):
        self.parts.append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'
            f'<text x="{x+16}" y="{y+22}" font-size="11" fill="{MUTED}">«{stereotype}»</text>'
            f'<text x="{x+16}" y="{y+42}" font-size="15" font-weight="700" fill="{INK}">{title}</text>'
        )

    def comp(self, x, y, w, h, lines, fill="#ffffff", stroke="#334155"):
        self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>')
        n = len(lines)
        top = y + h / 2 - (n - 1) * 8
        for i, line in enumerate(lines):
            weight, size, color = ("700", 13, INK) if i == 0 else ("400", 11.5, "#374151")
            self.parts.append(
                f'<text x="{x+w/2}" y="{top+i*16+4}" text-anchor="middle" font-size="{size}" font-weight="{weight}" fill="{color}">{line}</text>'
            )

    def arrow(self, points, label=None, at=None, anchor="middle", color="#475569", dashed=False, both=False):
        pts = " ".join(f"{x},{y}" for x, y in points)
        dash = ' stroke-dasharray="6 4"' if dashed else ""
        start = f' marker-start="url(#dot-{color[1:]})"' if both else ""
        self.parts.append(f'<polyline points="{pts}" fill="none" stroke="{color}" stroke-width="1.8"{dash} marker-end="url(#arrow-{color[1:]})"{start}/>')
        if label:
            lx, ly = at
            for i, line in enumerate(label.split("\n")):
                self.parts.append(
                    f'<text x="{lx}" y="{ly+i*14}" text-anchor="{anchor}" font-size="11" fill="{color}" '
                    f'paint-order="stroke" stroke="#ffffff" stroke-width="4" stroke-linejoin="round">{line}</text>'
                )

    def note(self, x, y, text, color=MUTED, anchor="start"):
        for i, line in enumerate(text.split("\n")):
            self.parts.append(f'<text x="{x}" y="{y+i*15}" text-anchor="{anchor}" font-size="11.5" fill="{color}">{line}</text>')

    def write(self, path):
        defs = "".join(
            f'<marker id="arrow-{c[1:]}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">'
            f'<path d="M0,0 L10,5 L0,10 z" fill="{c}"/></marker>'
            f'<marker id="dot-{c[1:]}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6"><circle cx="5" cy="5" r="4" fill="{c}"/></marker>'
            for c in ("#475569", TUNNEL, "#9ca3af")
        )
        body = "\n".join(self.parts)
        Path(path).write_text(
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}" '
            f'font-family="{FONT}">\n<defs>{defs}</defs>\n<rect width="100%" height="100%" fill="#ffffff"/>\n{body}\n</svg>\n'
        )


def simple():
    s = Svg(900, 440)
    s.node(20, 20, 860, 400, "device", "Laptop: everything on one machine")
    s.comp(60, 110, 200, 70, ["Claude Code", "the agent, in your terminal"])
    s.comp(330, 100, 230, 90, ["chrome-devtools MCP", "npx chrome-devtools-mcp", "--browser-url 127.0.0.1:9222"])
    s.comp(630, 100, 220, 90, ["Google Chrome", "separate debug profile", "--remote-debugging-port=9222"])
    s.comp(630, 290, 220, 80, ["Dev server", "npm run dev", "127.0.0.1:5173 and :8000"])
    s.comp(60, 290, 200, 80, ["logs/", "api.log, web.log", "written by npm run dev"])
    s.arrow([(260, 145), (330, 145)], "stdio", (295, 136))
    s.arrow([(560, 145), (630, 145)], "CDP\nHTTP + WebSocket", (595, 118))
    s.arrow([(740, 190), (740, 290)], "http://localhost:5173", (750, 244), anchor="start")
    s.arrow([(630, 330), (260, 330)], "tee", (445, 322))
    s.arrow([(160, 290), (160, 180)], "reads", (170, 240), anchor="start", dashed=True)
    s.note(60, 400, "You watch the Chrome window; the agent sees the same tab through CDP. Nothing leaves 127.0.0.1.")
    s.write("assets/mode-1-local.svg")


def container():
    s = Svg(1000, 560)
    s.node(20, 20, 960, 520, "device", "Laptop (host): Chrome and the forwarder live here")
    s.node(440, 70, 520, 420, "container", "Docker, devcontainer or Apple container", fill="#eef2ff", stroke="#6366f1")
    s.comp(60, 90, 320, 80, ["Google Chrome", "separate debug profile", "listens on 127.0.0.1:9222 only"])
    s.comp(60, 240, 150, 90, ["Published port", "-p 127.0.0.1:5173:5173", "into the container"])
    s.comp(230, 240, 150, 90, ["socat / CDP proxy", "listens 0.0.0.0:9223", "forwards to 127.0.0.1:9222"])
    s.comp(470, 130, 220, 70, ["Claude Code", "the agent, inside the sandbox"])
    s.comp(720, 130, 220, 90, ["chrome-devtools MCP", "--browser-url", "http://192.168.64.1:9223"])
    s.comp(470, 330, 220, 90, ["Dev server", "npm run dev inside", "listens on 0.0.0.0:5173"])
    s.arrow([(690, 165), (720, 165)], "stdio", (705, 156))
    s.arrow([(830, 220), (830, 285), (380, 285)], "CDP to the host's IP as seen from inside\nHost header is an IP literal, so Chrome accepts it", (600, 262))
    s.arrow([(305, 240), (305, 170)], "127.0.0.1:9222", (315, 210), anchor="start")
    s.arrow([(120, 170), (120, 240)], "http://localhost:5173", (130, 210), anchor="start")
    s.arrow([(135, 330), (135, 375), (470, 375)], "to container port 5173", (300, 366))
    s.note(470, 447, "192.168.64.1 = the host from the container's view\n(Apple container gateway; Docker: host.docker.internal's IP)", anchor="start")
    s.note(60, 505, "Chrome runs on the host, so URLs are the host's view: the dev server must publish its port to be visible to Chrome,\n"
                    "and the MCP must address the host by IP (or use the Host-rewriting proxy when it needs a hostname).")
    s.write("assets/mode-2-container.svg")


def remote():
    s = Svg(1000, 560)
    s.node(20, 40, 420, 460, "device", "Laptop: Chrome and the SSH client")
    s.node(560, 40, 420, 460, "device", "Dev server: the agent runs here")
    s.comp(50, 90, 360, 60, ["ssh client", "ssh -R 9222:127.0.0.1:9222 -L 5173:127.0.0.1:5173 server"])
    s.comp(50, 260, 360, 60, ["Google Chrome, debug profile", "--remote-debugging-port=9222 (127.0.0.1)"])
    s.comp(50, 400, 360, 60, ["localhost:5173 on the laptop", "forward tunnel entrance (-L)"])
    s.comp(590, 90, 360, 50, ["sshd", "your terminal session runs the agent"])
    s.comp(590, 160, 150, 60, ["Claude Code", "the agent"])
    s.comp(760, 160, 190, 70, ["chrome-devtools MCP", "--browser-url", "http://127.0.0.1:9222"])
    s.comp(590, 260, 360, 60, ["127.0.0.1:9222 on the server", "reverse tunnel entrance (-R)"])
    s.comp(590, 400, 360, 60, ["Dev server", "npm run dev, 127.0.0.1:5173"])
    s.arrow([(410, 115), (590, 115)], "SSH session, TCP 22\ncarries both tunnels", (500, 88), color=TUNNEL)
    s.arrow([(665, 140), (665, 160)], None, None)
    s.arrow([(740, 190), (760, 190)], None, None)
    s.arrow([(855, 230), (855, 260)], "CDP", (865, 250), anchor="start")
    s.arrow([(590, 290), (410, 290)], "-R 9222: inside the SSH tunnel", (500, 282), color=TUNNEL)
    s.arrow([(230, 320), (230, 400)], "http://localhost:5173", (240, 365), anchor="start")
    s.arrow([(410, 430), (590, 430)], "-L 5173: inside the SSH tunnel", (500, 422), color=TUNNEL)
    s.note(50, 486, "Chrome sees only localhost traffic: no proxy, no Host trick.", anchor="start")
    s.note(50, 530, "Blue = carried inside the SSH connection. Both tunnel ends are loopback, nothing is exposed on either network.\n"
                    "The same MCP config (127.0.0.1:9222) works on the laptop and on the server.")
    s.write("assets/mode-3-remote.svg")


if __name__ == "__main__":
    Path("assets").mkdir(exist_ok=True)
    simple(); container(); remote()
    print("wrote assets/mode-1-local.svg mode-2-container.svg mode-3-remote.svg")
