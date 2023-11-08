import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "AirBnB",
    locations: ["New York"],
    minimumQualifications: ["Code"],
    ...jobProps
  });

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    });
  };

  it("renders job title", () => {
    const jobProps = createJobProps({ title: "Vue Developer" });
    renderJobListing(jobProps);

    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });

  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "Samsung" });
    renderJobListing(jobProps);

    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  it("renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Ohio", "Michigan"] });
    renderJobListing(jobProps);

    expect(screen.getByText("Ohio")).toBeInTheDocument();
    expect(screen.getByText("Michigan")).toBeInTheDocument();
  });

  it("renders job qualifications", () => {
    const jobProps = createJobProps({ minimumQualifications: ["Vue knowledge", "Cool hair"] });
    renderJobListing(jobProps);

    expect(screen.getByText("Vue knowledge")).toBeInTheDocument();
    expect(screen.getByText("Cool hair")).toBeInTheDocument();
  });
});
