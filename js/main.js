d3.csv("data/output.csv").then((data) => {
  // convert strings to numbers
  data.forEach((d) => {
    for (let year = 1961; year <= 2023; year++) {
      const columnName = "F" + year;

      if (columnName in d) {
        d[columnName] = +d[columnName].replace(/,/g, "");
      }
    }
  });

  const countries = [...new Set(data.map((d) => d.Country))];

  // Populate select options with countries
  const select = d3.select("#country");
  select
    .selectAll("option")
    .data(countries)
    .enter()
    .append("option")
    .text((d) => d)
    .attr("value", (d) => d);

  const defaultOption = "World"; // Change this to your desired default option

  select.property("value", defaultOption);

  dynamicBar = new StripeChart(
    {
      parentElement: "#vis-dynamic",
    },
    data,
    "World"
  );
  dynamicBar.updateVis();
  select.on("change", function () {
    const selectedCountry = d3.select(this).property("value");
    dynamicBar.updateVis(selectedCountry);
  });

  function sanitizeForID(country) {
    // Replace spaces and other special characters with dashes
    return country.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  }

  // Function to create divs for each country
  function createCountryDivs(countries) {
    countries.forEach((country) => {
      const sanitizedID = sanitizeForID(country);
      d3.select(".vis-wrapper")
        .append("div")
        .attr("id", `vis-${sanitizedID}`)
        .attr("class", "vis-country")
        .style("width", "420px")
        .style("height", "300px");

      const chart = new StripeChart(
        {
          parentElement: `#vis-${sanitizedID}`,
        },
        data,
        country,
        420,
        300
      );
      chart.updateVis();
    });
  }

  createCountryDivs(countries);
});
