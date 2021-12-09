const skynet = require('../../util/skynet');

describe('skynet', () => {
  it('converts number synt to skynet', () => {
    const result = skynet.synt_to_skynet(1000000);

    expect(result).toBe(0.000001);
  });
  it('converts string synt to skynet', () => {
    const result = skynet.synt_to_skynet('1000000');

    expect(result).toBe(0.000001);
  });
  it('converts number synt to skynet string', () => {
    const result = skynet.synt_to_skynet_string(1000000);

    expect(result).toBe('0.000001');
  });
  it('converts string synt to skynet string', () => {
    const result = skynet.synt_to_skynet_string('1000000');

    expect(result).toBe('0.000001');
  });
  it('converts number skynet to synt', () => {
    const result = skynet.skynet_to_synt(0.000001);

    expect(result).toBe(1000000);
  });
  it('converts string skynet to synt', () => {
    const result = skynet.skynet_to_synt('0.000001');

    expect(result).toBe(1000000);
  });
  it('converts number synt to colouredcoin', () => {
    const result = skynet.synt_to_colouredcoin(1000000);

    expect(result).toBe(1000);
  });
  it('converts string synt to colouredcoin', () => {
    const result = skynet.synt_to_colouredcoin('1000000');

    expect(result).toBe(1000);
  });
  it('converts number synt to colouredcoin string', () => {
    const result = skynet.synt_to_colouredcoin_string(1000000);

    expect(result).toBe('1,000');
  });
  it('converts string synt to colouredcoin string', () => {
    const result = skynet.synt_to_colouredcoin_string('1000000');

    expect(result).toBe('1,000');
  });
  it('converts number colouredcoin to synt', () => {
    const result = skynet.colouredcoin_to_synt(1000);

    expect(result).toBe(1000000);
  });
  it('converts string colouredcoin to synt', () => {
    const result = skynet.colouredcoin_to_synt('1000');

    expect(result).toBe(1000000);
  });
});
