import { render, screen } from "@testing-library/vue";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { describe } from "vitest";

describe("TheSubnav", () => {
  const renderTheSubnav = (routeName) => {
    const $route = {
      name: routeName
    };

    render(TheSubnav, {
      global: {
        mocks: {
          $route
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    });
  };

  describe("when user is on jobs page", () => {
    it("displays job count", () => {
      renderTheSubnav("JobResults");

      const jobCount = screen.getByText("1653");

      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when user is not on jobs page", () => {
    it("does not display job count", () => {
      renderTheSubnav("Home");

      const jobCount = screen.queryByText("1653");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
