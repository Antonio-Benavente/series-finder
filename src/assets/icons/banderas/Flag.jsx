import arFlag from './AR.svg';
import boFlag from './BO.svg';
import brFlag from './BR.svg';
import clFlag from './CL.svg';
import coFlag from './CO.svg';
import crFlag from './CR.svg';
import doFlag from './DO.svg';
import ecFlag from './EC.svg';
import esFlag from './ES.svg';
import gbFlag from './GB.svg';
import gtFlag from './GT.svg';
import mxFlag from './MX.svg';
import paFlag from './PA.svg';
import peFlag from './PE.svg';
import pyFlag from './PY.svg';
import usFlag from './US.svg';
import uyFlag from './UY.svg';

const FLAGS = {
  AR: arFlag,
  BO: boFlag,
  BR: brFlag,
  CL: clFlag,
  CO: coFlag,
  CR: crFlag,
  DO: doFlag,
  EC: ecFlag,
  ES: esFlag,
  GB: gbFlag,
  GT: gtFlag,
  MX: mxFlag,
  PA: paFlag,
  PE: peFlag,
  PY: pyFlag,
  US: usFlag,
  UY: uyFlag,
};

const ASPECT = 480 / 640;

export function Flag({ country, size = 24, className, style }) {
  const src = FLAGS[country] || esFlag;
  return (
    <img
      src={src}
      alt={country}
      width={size}
      height={size * ASPECT}
      className={className}
      style={{ flexShrink: 0, ...style }}
    />
  );
}

export const AR = (props) => <Flag country="AR" {...props} />;
export const BO = (props) => <Flag country="BO" {...props} />;
export const BR = (props) => <Flag country="BR" {...props} />;
export const CL = (props) => <Flag country="CL" {...props} />;
export const CO = (props) => <Flag country="CO" {...props} />;
export const CR = (props) => <Flag country="CR" {...props} />;
export const DO = (props) => <Flag country="DO" {...props} />;
export const EC = (props) => <Flag country="EC" {...props} />;
export const ES = (props) => <Flag country="ES" {...props} />;
export const GB = (props) => <Flag country="GB" {...props} />;
export const GT = (props) => <Flag country="GT" {...props} />;
export const MX = (props) => <Flag country="MX" {...props} />;
export const PA = (props) => <Flag country="PA" {...props} />;
export const PE = (props) => <Flag country="PE" {...props} />;
export const PY = (props) => <Flag country="PY" {...props} />;
export const US = (props) => <Flag country="US" {...props} />;
export const UY = (props) => <Flag country="UY" {...props} />;
