import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/vue";
import { expect, afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
