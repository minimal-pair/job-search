import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    const companyName = screen.getByText("Timbo Careers");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items for navigation", () => {
    render(MainNav);
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent);
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at Timbo Careers",
      "How we hire",
      "Students",
      "Jobs"
    ]);
  });

  describe("when a user logs in", () => {
    it("displays user profile picture", async () => {
      render(MainNav);

      let profileImage = screen.queryByRole("img", {
        name: /user profile image/i
      });
      expect(profileImage).not.toBeInTheDocument();

      const logInButton = screen.getByRole("button", {
        name: /sign in/i
      });
      await userEvent.click(logInButton);

      profileImage = screen.getByRole("img", {
        name: /user profile image/i
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
