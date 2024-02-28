import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';

function myCustomResolverPlugin() {
	return {
	  name: 'my-custom-resolver', // this name will show up in warnings and errors
	  resolveId(source) {
		if (source.startsWith("./node_modules")) {
		  // Redirect all imports of 'certain-module' to a specific path
		  return `${source}`;
		}
		// Return null so Rollup handles all other imports normally
		return null;
	  }
	};
  }

export default {
	input: 'dist/http-hello-world.js',
	output: {
		file: 'dist/http-hello-world.bundled.js',
		format: 'esm'
	},
    external: [
        "wasi:http/types@0.2.0"
    ],
    plugins: [commonjs({
		ignoreGlobal: false,  // Default: false
	  }), nodeResolve()]
};