# PixelzDuckz
if it works, it’s a miracle. If it doesn't, it’s a feature. 🐛
# Minecraft Vibes

# VEXOL Engine

A procedurally generated 3D sandbox built with **Three.js**. This project features a dynamic world with hills, trees, physics-based movement, and a "TNT" system for environmental destruction.

## 🚀 Features
* **Procedural Generation**: Every time you refresh, a new landscape of hills and valleys is created using sine-wave math.
* **Physics Engine**: Includes gravity and jumping mechanics.
* **Day/Night Cycle**: The sky color and lighting shift dynamically over time.
* **Interactive Building**: Right-click to place blocks on any surface.
* **Explosive TNT**: Use the "G" key to clear out areas with a blast radius.

## 🎮 Controls
| Key | Action |
| :--- | :--- |
| **W, A, S, D** | Move Character |
| **Spacebar** | Jump |
| **Mouse** | Look Around (Click screen to lock) |
| **Right-Click** | Place a Wood/Dirt Block |
| **G** | TNT (Explode nearby blocks) |
| **R** | Hard Reset (Regenerate World) |
| **ESC** | Unlock Mouse Cursor |

## 🛠️ Installation & Setup
1.  **Download** the `index.html` and `script.js` files into the same folder.
2.  **Run a Local Server**: Because this project uses JavaScript Modules, it must be viewed through a server.
    * **VS Code**: Install the "Live Server" extension and click "Go Live".
    * **Python**: Run `python -m http.server` in your terminal.
3.  **Open** your browser to `http://localhost:5500` (or the port provided).

## 🧪 Tech Stack
* [Three.js](https://threejs.org/) - 3D Engine
* HTML5 / CSS3 / JavaScript (ES6 Modules)
