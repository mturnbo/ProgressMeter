/* SVG Utilities */

import config from 'config';

var SVGUtilities = {
  makeSVG: (width, height) => {
    let svg = document.createElementNS(config.svgns, 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    return svg;
  },

  makeGradient: (id, colorStart, colorEnd, def = false, line = false) => {
    let grad = document.createElementNS(config.svgns, 'linearGradient');
    grad.setAttribute('id', id);

    if (line) {
      grad.setAttribute('id', id);
      grad.setAttribute('x1', '0%');
      grad.setAttribute('x2', '100%');
      grad.setAttribute('y1', '0%');
      grad.setAttribute('y2', '0%');
      grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    }

    let startStop = document.createElementNS(config.svgns, 'stop');
    startStop.setAttribute('offset', '0%');
    startStop.setAttribute('stop-color', colorStart);
    grad.appendChild(startStop);

    let endStop = document.createElementNS(config.svgns, 'stop');
    endStop.setAttribute('offset', '100%');
    endStop.setAttribute('stop-color', colorEnd);
    grad.appendChild(endStop);

    let objGradient = grad;

    if (def) {
      objGradient = document.createElementNS(config.svgns, 'defs');
      objGradient.appendChild(grad);
    }

    return objGradient;
  },

  makeLine: (id, width, stroke = 20, padding = 20) => {
    let line = document.createElementNS(config.svgns, 'line');
    line.setAttribute('id', id);
    line.setAttribute('x1', padding);
    line.setAttribute('x2', width - padding);
    line.setAttribute('y1', stroke / 2);
    line.setAttribute('y2', stroke / 2);
    return line;
  },

  makeCircle: (id, centerX, centerY, radius, style) => {
    let circle = document.createElementNS(config.svgns, 'circle');
    circle.setAttribute('id', id);
    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('r', radius);
    if (style) {
      circle.style = style;
    }

    return circle;
  },

  makeArc: (id, centerX, centerY, radius, startAngle, endAngle, style) => {
    let start = SVGUtilities.polarToCartesian(centerX, centerY, radius, startAngle);
    let end = SVGUtilities.polarToCartesian(centerX, centerY, radius, endAngle);
    let isLargeArc = endAngle - startAngle <= 180 ? '0' : '1';
    let sweep = 1;
    let attr = [
      'M', start.x, start.y,
      'A', radius, radius, 0, isLargeArc, sweep, end.x, end.y
    ].join(' ');

    let arc = document.createElementNS(config.svgns, 'path');
    arc.setAttribute('id', id);
    arc.setAttribute('d', attr);
    if (style) {
      arc.style = style;
    }

    return arc;
  },

  polarToCartesian: (centerX, centerY, radius, angleInDegrees) => {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  }
};

export default SVGUtilities;
