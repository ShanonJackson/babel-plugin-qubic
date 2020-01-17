## babel-plugin-qubic

### 
- npm i --save-dev babel-plugin-qubic
- plugins: ["babel-plugin-qubic"]

Why?
Will aggressively tree shake your imports from qubic's separate tree shaking distribution.
will change `import { Button } from "qubic"` to `import { Button } from "qubic/dist/export/button` and all other exports.

Can handle multiple named exports. Will error if it detects `import * as XYZ from "qubic"` syntax.
