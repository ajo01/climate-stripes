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

  bar = new StripeChart(
    {
      parentElement: "#vis-canada",
    },
    data,
    "Canada",
    600,
    400
  );
  bar.updateVis();

  franceBar = new StripeChart(
    {
      parentElement: "#vis-france",
    },
    data,
    "France"
  );
  franceBar.updateVis();

  kenyaBar = new StripeChart(
    {
      parentElement: "#vis-kenya",
    },
    data,
    "Qatar"
  );
  kenyaBar.updateVis();
});
