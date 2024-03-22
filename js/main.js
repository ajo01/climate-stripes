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

  // // initialize chart
  bar = new StripeChart(
    {
      parentElement: "#vis",
    },
    data
  );
  // render chart
  bar.updateVis();
});
