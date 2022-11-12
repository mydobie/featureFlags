import React, { ReactElement } from 'react';
import FeatureFlagsUI from '../components/FeatureFlagsUI';
import ExclamationCircle from './images/ExclamationCircle';
import {
  useIsFeatureActive,
  FeatureFlagged,
  useGetFeatures,
  useEditFeatureFlag,
} from '../components/';

import { SWEETS, DINOS, OTHER } from '../FeatureFlagsConfig';

const preStyle = { fontSize: '.7em', backgroundColor: '#eee', padding: '10px' };

const ContextPage = (): ReactElement => {
  const isSweets = useIsFeatureActive(SWEETS);
  const features = useGetFeatures();
  const setFeature = useEditFeatureFlag();
  return (
    <div className='container'>
      <h1>Feature flags - context</h1>
      <div className='row'>
        <div className='col'>
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
              console.log(
                'All features have been reset to their original value'
              );
            }}
            notDefaultIndicator={<ExclamationCircle />}
          />{' '}
          {isSweets ? (
            <div>
              <hr />
              <h2>Yummy sweets</h2>
              <p>
                Wafer gummi bears dragée cheesecake gummi bears carrot cake tart
                jelly-o sweet roll. Tart soufflé chocolate cake marzipan sweet
                roll tootsie roll wafer gummies. Soufflé tiramisu cheesecake ice
                cream lemon drops pastry oat cake ice cream donut. Candy canes
                liquorice soufflé danish brownie macaroon macaroon dragée.
              </p>
            </div>
          ) : null}
          <FeatureFlagged feature={DINOS}>
            <div>
              <hr />
              <h2>Pack of Dinos</h2>
              <p>
                Lessemsaurus Acristavus Koreaceratops Nebulasaurus
                Propanoplosaurus Owenodon Onychosaurus Rayososaurus Nurosaurus
                Lambeosaurus Tethyshadros Bellusaurus Chromogisaurus
                Nanotyrannus Monoclonius Sterrholophus Dryosaurus Galvesaurus
                Geranosaurus Aviatyrannis Ricardoestesia Omnivoropteryx
                Tianyuraptor Kakuru Cylindricodon Stenopelix Ornatotholus
                Cystosaurus Struthiosaurus Rileyasuchus.
              </p>
            </div>
          </FeatureFlagged>
          <FeatureFlagged feature={DINOS} isNotActive>
            <div>
              <hr />
              <h2>Dinos are sleeping</h2>
              <p>Shhhhh.</p>
            </div>
          </FeatureFlagged>
        </div>
        <div className='col'>
          <h2>Manual get and set feature</h2>
          <p>
            <button
              className='btn btn-primary'
              onClick={() => {
                const otherActive = features.find(
                  (feature) => feature.id === OTHER
                )?.active;
                setFeature(OTHER, !otherActive);
              }}
            >
              Toggle Other
            </button>
          </p>
          <pre style={preStyle}>{JSON.stringify(features, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default ContextPage;
