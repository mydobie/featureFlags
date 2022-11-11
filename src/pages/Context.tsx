import React, { ReactElement } from 'react';
import FeatureFlagsUI from '../components/FeatureFlagsUI';
import ExclamationCircle from './images/ExclamationCircle';
import { useIsFeatureActive, FeatureFlagged } from '../components/';

import { COLORS, DINOS } from '../FeatureFlagsConfig';

const ContextPage = (): ReactElement => {
  const isColors = useIsFeatureActive(COLORS);
  return (
    <div className='container'>
      <h1>Feature flags - context</h1>
      <FeatureFlagsUI
        onFeatureChange={(id, isActive) => {
          // NOTE: This is a good place to put an ajax call
          // if there a need to sent feature flag status to a backend

          // eslint-disable-next-line no-console
          console.log(
            `Feature flag ${id} is now ${isActive ? '' : 'NOT'} active `
          );
        }}
        onFeatureReset={() => {
          // NOTE: This is a good place to put an ajax call
          // if there a need to sent feature flag status to a backend

          // eslint-disable-next-line no-console
          console.log('All features have been reset to their original value');
        }}
        notDefaultIndicator={<ExclamationCircle />}
      />

      {isColors ? (
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
      <FeatureFlagged feature={DINOS}>
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
      </FeatureFlagged>
    </div>
  );
};

export default ContextPage;
