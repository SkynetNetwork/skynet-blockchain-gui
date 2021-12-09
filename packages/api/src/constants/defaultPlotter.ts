import PlotterName from './PlotterName';
import optionsForPlotter from '../utils/optionsForPlotter';
import defaultsForPlotter from '../utils/defaultsForPlotter';

export default {
  displayName: "Skynet Proof of Space",
  options: optionsForPlotter(PlotterName.SKYNETPOS),
  defaults: defaultsForPlotter(PlotterName.SKYNETPOS),
  installInfo: { installed: true },
};
