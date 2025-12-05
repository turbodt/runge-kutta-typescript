import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";


export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "RKLib",
            fileName: (format) => `rk-lib.${format}.js`,
            formats: ["es", "cjs", "umd"]
        },
        rollupOptions: {
            output: {
                globals: {}
            }
        }
    },
    plugins: [
        dts({
            rollupTypes: true,
            insertTypesEntry: true
        })
    ]
});
