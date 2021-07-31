import React, { ReactElement } from 'react';
import { FeatureFlagsUI, isFeatureActive } from '../components';

import { COLORS, DINOS } from '../FeatureFlagsConfig';

type LocalStoragePageProps = {
  onFeatureChange: () => void;
};

// eslint-disable-next-line arrow-body-style
const LocalStoragePage = ({
  onFeatureChange = () => {},
}: LocalStoragePageProps): ReactElement => (
  <div className='container'>
    <h1>Feature flags - local storage</h1>
    <FeatureFlagsUI onFeatureChange={onFeatureChange} />

    {isFeatureActive(COLORS) ? (
      <div>
        <hr />
        <h2>Colors content</h2>
        <p>
          Wafer gummi bears dragée cheesecake gummi bears carrot cake tart
          jelly-o sweet roll. Tart soufflé chocolate cake marzipan sweet roll
          tootsie roll wafer gummies. Soufflé tiramisu cheesecake ice cream
          lemon drops pastry oat cake ice cream donut. Candy canes liquorice
          soufflé danish brownie macaroon macaroon dragée.
        </p>
      </div>
    ) : null}
    {isFeatureActive(DINOS) ? (
      <div>
        <hr />
        <h2>Dinos content</h2>
        <p>
          Lessemsaurus Acristavus Koreaceratops Nebulasaurus Propanoplosaurus
          Owenodon Onychosaurus Rayososaurus Nurosaurus Lambeosaurus
          Tethyshadros Bellusaurus Chromogisaurus Nanotyrannus Monoclonius
          Sterrholophus Dryosaurus Galvesaurus Geranosaurus Aviatyrannis
          Ricardoestesia Omnivoropteryx Tianyuraptor Kakuru Cylindricodon
          Stenopelix Ornatotholus Cystosaurus Struthiosaurus Rileyasuchus.
        </p>
      </div>
    ) : null}
  </div>
);

export default LocalStoragePage;
