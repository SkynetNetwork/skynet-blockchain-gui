const skynet = require('../../util/skynet');

describe('skynet', () => {
  it('converts number mojo to skynet', () => {
    const result = skynet.mojo_to_skynet(1000000);

    expect(result).toBe(0.000001);
  });
  it('converts string mojo to skynet', () => {
    const result = skynet.mojo_to_skynet('1000000');

    expect(result).toBe(0.000001);
  });
  it('converts number mojo to skynet string', () => {
    const result = skynet.mojo_to_skynet_string(1000000);

    expect(result).toBe('0.000001');
  });
  it('converts string mojo to skynet string', () => {
    const result = skynet.mojo_to_skynet_string('1000000');

    expect(result).toBe('0.000001');
  });
  it('converts number skynet to mojo', () => {
    const result = skynet.skynet_to_mojo(0.000001);

    expect(result).toBe(1000000);
  });
  it('converts string skynet to mojo', () => {
    const result = skynet.skynet_to_mojo('0.000001');

    expect(result).toBe(1000000);
  });
  it('converts number mojo to colouredcoin', () => {
    const result = skynet.mojo_to_colouredcoin(1000000);

    expect(result).toBe(1000);
  });
  it('converts string mojo to colouredcoin', () => {
    const result = skynet.mojo_to_colouredcoin('1000000');

    expect(result).toBe(1000);
  });
  it('converts number mojo to colouredcoin string', () => {
    const result = skynet.mojo_to_colouredcoin_string(1000000);

    expect(result).toBe('1,000');
  });
  it('converts string mojo to colouredcoin string', () => {
    const result = skynet.mojo_to_colouredcoin_string('1000000');

    expect(result).toBe('1,000');
  });
  it('converts number colouredcoin to mojo', () => {
    const result = skynet.colouredcoin_to_mojo(1000);

    expect(result).toBe(1000000);
  });
  it('converts string colouredcoin to mojo', () => {
    const result = skynet.colouredcoin_to_mojo('1000');

    expect(result).toBe(1000000);
  });
});
