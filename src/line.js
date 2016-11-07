import config from 'config';
import Utilities from 'utilities';

var Line = function Line() {
  var width;
  var height;
  var stroke;
  var colors = config.colors;
  var meter;
  var msg;

  this.generate = function () {
    this.meter = Utilities.makeSVG(this.width, this.height);

    // gradient
    let gradId = 'gradline';
    let gradDef = Utilities.makeGradient(gradId, this.colors.start, this.colors.end, true, true);
    this.meter.insertBefore(gradDef, this.meter.firstChild);

    // background line
    let backgroundLine = Utilities.makeLine('background', this.width, this.stroke, this.padding);
    backgroundLine.style.fill = 'none';
    backgroundLine.style.stroke = this.options.colors.background;
    backgroundLine.style.strokeWidth = this.options.stroke;
    backgroundLine.style.strokeLinecap = 'round';
    this.meter.appendChild(backgroundLine);

    // progress line
    let progressWidth = this.options.progress * this.options.width;
    let progressLine = Utilities.makeLine('progress', progressWidth, this.stroke, this.padding);
    progressLine.style.fill = 'none';
    progressLine.style.stroke = `url(#${gradId})`;
    progressLine.style.strokeWidth = this.options.stroke;
    progressLine.style.strokeLinecap = 'round';

    this.meter.appendChild(progressLine);
  };
};

module.exports = Line;
