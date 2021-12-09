export const service_wallet = 'skynet_wallet';
export const service_full_node = 'skynet_full_node';
export const service_farmer = 'skynet_farmer';
export const service_harvester = 'skynet_harvester';
export const service_simulator = 'skynet_full_node_simulator';
export const service_daemon = 'daemon';
export const service_plotter = 'skynet_plotter';

// Corresponds with outbound_message.py NodeTypes
export const service_connection_types = {
  1: 'Full Node',
  2: 'Harvester',
  3: 'Farmer',
  4: 'Timelord',
  5: 'Introducer',
  6: 'Wallet',
  7: 'Plotter',
};
