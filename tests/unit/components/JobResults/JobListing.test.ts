import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import type { Job } from "@/api/types";
import JobListing from "@/components/JobResults/JobListing.vue";

import { createJob } from "../../../utils/createJob";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    locations: ["New York"],
    minimumQualifications: ["Code"],
    ...jobProps
  });

  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub
        }
      },
      props: {
        job: {
          ...job
        }
      }
    });
  };

  it("renders job title", () => {
    const jobProps = createJob({ title: "Vue Developer" });
    renderJobListing(jobProps);

    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJob({ organization: "Samsung" });
    renderJobListing(jobProps);

    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJob({ locations: ["Ohio", "Michigan"] });
    renderJobListing(jobProps);

    expect(screen.getByText("Ohio")).toBeInTheDocument();
    expect(screen.getByText("Michigan")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJob({ minimumQualifications: ["Vue knowledge", "Cool hair"] });
    renderJobListing(jobProps);

    expect(screen.getByText("Vue knowledge")).toBeInTheDocument();
    expect(screen.getByText("Cool hair")).toBeInTheDocument();
  });
});
