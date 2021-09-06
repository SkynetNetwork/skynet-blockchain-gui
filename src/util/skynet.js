const Big = require('big.js');
const units = require('./units');

// TODO: use bigint instead of float
const convert = (amount, from, to) => {
  if (Number.isNaN(Number.parseFloat(amount)) || !Number.isFinite(amount)) {
    return 0;
  }

  const amountInFromUnit = Big(amount).times(units.getUnit(from));

  return Number.parseFloat(amountInFromUnit.div(units.getUnit(to)));
};

class Skynet {
  constructor(value, unit) {
    this._value = value;
    this._unit = unit;
  }

  to(newUnit) {
    this._value = convert(this._value, this._unit, newUnit);
    this._unit = newUnit;

    return this;
  }

  value() {
    return this._value;
  }

  format() {
    const displayUnit = units.getDisplay(this._unit);

    const { format, fractionDigits, trailing } = displayUnit;

    let options = { maximumFractionDigits: fractionDigits };

    if (trailing) {
      options = { minimumFractionDigits: fractionDigits };
    }

    let value;

    if (fractionDigits !== undefined) {
      const fractionPower = Big(10).pow(fractionDigits);
      value = Number.parseFloat(
        Big(Math.floor(Big(this._value).times(fractionPower))).div(
          fractionPower,
        ),
      );
    } else {
      value = this._value;
    }

    let formatted = format.replace(
      '{amount}',
      Number.parseFloat(value).toLocaleString(undefined, options),
    );

    if (displayUnit.pluralize && this._value !== 1) {
      formatted += 's';
    }

    return formatted;
  }

  toString() {
    const displayUnit = units.getDisplay(this._unit);
    const { fractionDigits } = displayUnit;
    const options = { maximumFractionDigits: fractionDigits };
    return Number.parseFloat(this._value).toLocaleString(undefined, options);
  }
}

export const skynet_formatter = (value, unit) => new Skynet(value, unit);

skynet_formatter.convert = convert;
skynet_formatter.setDisplay = units.setDisplay;
skynet_formatter.setUnit = units.setUnit;
skynet_formatter.getUnit = units.getUnit;
skynet_formatter.setFiat = (currency, rate, display = null) => {
  units.setUnit(currency, 1 / rate, display);
};

export const synt_to_skynet = (synt) => {
  return skynet_formatter(Number.parseInt(synt), 'synt').to('skynet').value();
};

export const skynet_to_synt = (skynet) => {
  return skynet_formatter(Number.parseFloat(Number(skynet)), 'skynet')
    .to('synt')
    .value();
};

export const synt_to_skynet_string = (synt) => {
  return skynet_formatter(Number(synt), 'synt').to('skynet').toString();
};

export const synt_to_colouredcoin = (synt) => {
  return skynet_formatter(Number.parseInt(synt), 'synt')
    .to('colouredcoin')
    .value();
};

export const colouredcoin_to_synt = (colouredcoin) => {
  return skynet_formatter(Number.parseFloat(Number(colouredcoin)), 'colouredcoin')
    .to('synt')
    .value();
};

export const synt_to_colouredcoin_string = (synt) => {
  return skynet_formatter(Number(synt), 'synt').to('colouredcoin').toString();
};
