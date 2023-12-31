import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");

import JobListings from "@/components/JobResults/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";
import { useDegreesStore } from "@/stores/degrees";

const useRouteMock = useRoute as Mock;

describe("JobListings", () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({});
    const degreesStore = useDegreesStore();

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub
        }
      }
    });

    return { jobsStore, degreesStore };
  };

  it("calls FETCH_JOBS action", () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { jobsStore } = renderJobListings();

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("calls FETCH_DEGREES action", () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { degreesStore } = renderJobListings();

    expect(degreesStore.FETCH_DEGREES).toHaveBeenCalled();
  });

  it("displays maximum of 10 jobs", async () => {
    useRouteMock.mockReturnValue({ query: { page: "1" } });

    const { jobsStore } = renderJobListings();
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });

  describe("when query params exclude page number", () => {
    it("displays page number 1", async () => {
      useRouteMock.mockReturnValue({ query: {} });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});
      await screen.findAllByRole("listitem");

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when query params include page number", () => {
    it("displays page number", async () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(25).fill({});
      await screen.findAllByRole("listitem");

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("doesn't have a previous page link", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on last page", () => {
    it("doesn't have a next page link", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /next/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { jobsStore } = renderJobListings();
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /previous/i });
      expect(nextLink).toBeInTheDocument();
    });
  });
});
