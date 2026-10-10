import oversizeTee from './images/real_oversize_tee_1791578480310.jpg';
import hoodieMockup from './images/real_hoodie_hd_1791578494376.jpg';
import classicTee from './images/real_classic_tee_1791578509415.jpg';
import totebagMockup from './images/real_totebag_hd_1791652076893.jpg';
import gymsackMockup from './images/real_gymsack_hd_1791652103564.jpg';

import blankOversizeTee from './images/blank_oversize_tee_1791652128545.jpg';
import blankHoodie from './images/blank_hoodie_1791652154531.jpg';
import blankClassicTee from './images/blank_classic_tee_1791652024297.jpg';
import blankTotebag from './images/blank_totebag_1791652039722.jpg';
import blankGymsack from './images/blank_gymsack_1791652057665.jpg';

export const REAL_MOCKUPS: Record<string, string> = {
  'tshirt-oversize': oversizeTee,
  'camiseta-oversize': oversizeTee,
  'hoodie-hd': hoodieMockup,
  'hoodie-sublimada': hoodieMockup,
  'tshirt-classic': classicTee,
  'camiseta-clasica': classicTee,
  'tote-bag': totebagMockup,
  'tote-bag-sublimada': totebagMockup,
  'gymsack': gymsackMockup,
  'mochila-sublimada': gymsackMockup,
};

export const BLANK_MOCKUPS: Record<string, string> = {
  'tshirt-oversize': blankOversizeTee,
  'camiseta-oversize': blankOversizeTee,
  'hoodie-hd': blankHoodie,
  'hoodie-sublimada': blankHoodie,
  'tshirt-classic': blankClassicTee,
  'camiseta-clasica': blankClassicTee,
  'tote-bag': blankTotebag,
  'tote-bag-sublimada': blankTotebag,
  'gymsack': blankGymsack,
  'mochila-sublimada': blankGymsack,
};
