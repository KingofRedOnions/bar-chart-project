/*
* Generate bar chart
* @param {Number[]}  data      Array of numbers, may be 2D for 'stacked' bars.
*                              Stacked bars MUST be sorted, but the application will handle that
*                              itself.
* @param {Object}    options   Object containing options for the bar chart, colours, width/height, etc.
*                              Background Colour, Bar Colour, Width/Height, Bar Spacing, Bar Chart Axes,
*                              Label Alignment, X/Y-Axis Labels/Ticks, Title, Font Size/Colour.
* @param {Element}   element   HTML object where the bar chart should be drawn
*/
function drawBarChart(data, options, element) {
  let container = document.createElement("div");

  if (!Array.isArray(data)) {
    throw new Error('drawBarChart @param data | Invalid data type');
  }
  tData = sortInnerArrays([...data]);
  const MAX = findMax2D(tData);

  for (let i = 0; i < tData.length; i++) {
    if (Array.isArray(tData[i])) {
      container.append(drawStackedBar(tData[i], options));
    } else {
      container.append(drawBar(tData[i], options));
    }
  }
}

/*
* Draw a single bar
* @param {Number}   value     Value(s) of bar.
* @param {Object}   options   Options object passed to be referenced from the main drawBarChart function.
*/
function drawBar(value, options) {
  if (isNaN(value)) {
    throw new Error ('drawBar @param value | Invalid data type');
  }

  let bar = document.createElement("div");
  bar.attr('height', String.toString());
}

function drawStackedBar(values, options) {

}

/*
* Sort all inner arrays by descending values.
* This is only used for the max function to determine height of bars relative
* to the height propety.
* @param  {Number[]} data  Full barchart array.
* @return {Number[]} Full array with all inner arrays sorted descending.
*/
function sortInnerArrays(data) {
  let tData = [...data];

  for (let i = 0; i < tData.length; i++) {
    if (Array.isArray(tData)) {
      tData[i] = tData[i].sort((a, b) => b - a);  // Sort descending.
    }
  }
}

/*
* Find the max value in the post-sorted array.
* @param  {Number[]}  2D Array to find max value in, with sub-arrays pre-sorted.
* @return Highest value in the 2D array.
*/
function findMax2D(values) {
  let tValues = [...values];
  let MAX;
  if (Array.isArray(tValues[0]))
    MAX = tValues[0][0];
  else MAX = tValues[0];

  for (let i = 0; i < tValues.length; i++) {
    if (Array.isArray(tValues[i]))
      if (MAX < tValues[i][0])
        MAX = tValues[i][0];
    else if (MAX < tValues[i])
      MAX = tValues[i];
  }

  return MAX;
}

const testData = [2, 4, 5, 7, 3, [2, 6, 3, 8]];
// x-Axis labels can be provided either matching the testData length for individual labels,
// two labels (beginning/end, or automatically populated range, based on the labelType option),
// or a single label centered at the bottom.  Will auto detect.
//
// Tick range is just for y-axis ticks, based on bar values.
const testOptions = {
  width: 800,
  height: 600,
  background: 'black',
  title: 'Test Chart',
  titleColour: 'white',
  barColour: 'red',
  barTextAlign: 'top',
  barSpacing: 5,
  barAxes: 'x',
  labels: [1, 2, 3, 4, 5, 6, 7],
  tickRange: 1
};
