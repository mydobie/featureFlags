import React, { ReactElement } from 'react';
import { FeatureFlagsUI, isFeatureActive, featureFlagged } from '../components';
import ExclamationCircle from './images/ExclamationCircle';

import { COLORS, DINOS } from '../FeatureFlagsConfig';

type LocalStoragePageProps = {
  onFeatureChange: (flagId?: string, isActive?: boolean) => void;
};

// eslint-disable-next-line arrow-body-style
const LocalStoragePage = ({
  onFeatureChange = () => {},
}: LocalStoragePageProps): ReactElement => (
  <div className='container'>
    <h1>Feature flags - local storage</h1>
    <FeatureFlagsUI
      onFeatureChange={(id, isActive) => {
        onFeatureChange(); // this is passed to AppRoutes to force an app rerender
        // NOTE: This is a good place to put an ajax call
        // if there a need to track feature flag status changes
        // eslint-disable-next-line no-console
        console.log('Feature flag ', id, 'is active:', isActive);
      }}
      onFeatureReset={() => {
        onFeatureChange(); // this is passed to AppRoutes to force an app rerender
        // NOTE: This is a good place to put an ajax call
        // if there a need to track feature flag status changes
        // eslint-disable-next-line no-console
        console.log('Local storage based features have been reset');
      }}
      notDefaultIndicator={<ExclamationCircle />}
    />

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
    {featureFlagged(
      DINOS,
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
    )}
  </div>
);

export default LocalStoragePage;
