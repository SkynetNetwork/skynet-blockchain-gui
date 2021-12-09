import PlotterName from '../constants/PlotterName';
import { PlotterOptions } from '../@types/Plotter';
import { bladebitOptions, madmaxOptions, skynetposOptions } from '../constants/Plotters';

export default function optionsForPlotter(plotterName: PlotterName): PlotterOptions {
  switch (plotterName) {
    case PlotterName.BLADEBIT:
      return bladebitOptions;
    case PlotterName.MADMAX:
      return madmaxOptions;
    case PlotterName.SKYNETPOS: // fallthrough
    default:
      return skynetposOptions;
  }
};

