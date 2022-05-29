/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';

import {
  FeatureFlagsReduxUI,
  useIsFeatureActive,
  useFeatureFlagged,
} from '../components';

import { VEGGIES, FRUITS } from '../FeatureFlagsConfig';

const ReduxPage = (): ReactElement => {
  const veggies = useFeatureFlagged(
    VEGGIES,
    <div>
      <hr />
      <h2>Veggie content</h2>
      <p>
        Fiery fruit hot Thai super chili red amazon pepper with Thai sun pepper
        red lentil curry tabasco pepper summertime crumbled lentils blueberries
        crunchy seaweed basil roasted peanuts tofu avocado dressing drizzle
        orange naga viper cremini mushrooms alfalfa sprouts picnic salad green
        pepper black bean wraps dark and stormy overflowing a delicious meal
        leek lychee.
      </p>
    </div>
  );
  const isFruits = useIsFeatureActive(FRUITS);
  return (
    <div className='container'>
      <h1>Feature flags - redux</h1>
      <FeatureFlagsReduxUI
        onFeatureChange={(id, isActive) => {
          // NOTE: This is a good place to put an ajax call
          // if there a need to track feature flag status changes

          // Make AJAX call to update feature flag status with backend

          // eslint-disable-next-line no-console
          console.log('Feature flag ', id, ' is active:', isActive);
        }}
        onFeatureReset={() => {
          // NOTE: This is a good place to put an ajax call
          // if there a need to track feature flag status changes

          // Make AJAX call to update feature flag status with backend

          // eslint-disable-next-line no-console
          console.log('Redux based features have been reset');
        }}
      />

      {isFruits ? (
        <div>
          <hr />
          <h2>Fruit content</h2>
          <p>
            Thai basil curry dark chocolate grapefruit avocado basil pesto
            habanero golden cherry balsamic vinaigrette spicy kimchi Thai curry
            roasted brussel sprouts blueberry pops scotch bonnet pepper
            creamiest strawberry mango smoothie banana creamy cauliflower
            alfredo sauce udon noodles picnic crispy salted coriander ginger
            carrot spiced juice hazelnut shiitake.
          </p>
        </div>
      ) : null}

      {veggies}
    </div>
  );
};

export default ReduxPage;
